import { responseHandler } from "../utils/responseHandler.js";
import { userModel } from "../models/user.model.js";
import { siteModel } from "../models/site.model.js";
import { methodModel } from "../models/method.model.js"
import { cpanelAccessInfo, siteLiveEmailTemplate } from "../utils/htmlTemlate.js";
import { sendEmail } from "../service/sendEmail.service.js"
import cloudinary from "../config/cloudinary.js"
import { contectModel } from "../models/contect.model.js";


export const getAllUser = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    // 📊 Query params (pagination + search)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // 🔍 Search filter (email / username)
    const filter = {
      $or: [
        { email: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
      ],
    };

    // 📦 Fetch users
    const users = await userModel
      .find(filter)
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    // 📊 Total count
    const totalUsers = await userModel.countDocuments(filter);

    return responseHandler(
      res,
      200,
      {
        users,
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
      },
      "All users fetched successfully"
    );
  } catch (error) {
    return responseHandler(
      res,
      500,
      {},
      `Internal server error: ${error.message}`,
      false
    );
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔐 admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    const user = await userModel.findById(id);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    await userModel.findByIdAndDelete(id);

    return responseHandler(res, 200, {}, "User deleted successfully");
  } catch (error) {
    return responseHandler(res, 500, {}, error.message, false);
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, newPassword, role } = req.body;

    const user = await userModel.findById(id);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    // 🔐 Allow: admin OR own account
    if (req.user.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (newPassword) user.password = newPassword;
    if (role) user.role = role;

    await user.save();

    return responseHandler(
      res,
      200,
      user,
      "User updated successfully"
    );
  } catch (error) {
    return responseHandler(res, 500, {}, error.message, false);
  }
};

export const approveFreeHosting = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // ✅ correct

    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    const user = await userModel.findById(id);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    // ✅ validate input
    if (!["approved", "rejected"].includes(status)) {
      return responseHandler(res, 400, {}, "Invalid status", false);
    }

    // ✅ prevent duplicate action
    if (user.status === status) {
      return responseHandler(res, 400, {}, `Already ${status}`, false);
    }

    // ✅ update status
    user.status = status;
    await user.save();

    // ❌ REJECT case
    if (status === "rejected") {
      // optional: rejection email
      await sendEmail(
        user.email,
        "Hosting Request Rejected ❌",
        "Sorry, your free hosting request was rejected."
      );

      return responseHandler(
        res,
        200,
        user,
        "Free hosting rejected"
      );
    }

    // ✅ APPROVE case
    const html = cpanelAccessInfo(user.userName, process.env.CPANEL_URL);

    await sendEmail(
      user.email,
      "Free Hosting Approved 🎉",
      html
    );

    return responseHandler(
      res,
      200,
      user,
      "Free hosting approved successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      error.message,
      "Internal Server Error Approve Hosting",
      false
    );
  }
};


// method form
export const getAllMethodForms = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }
    
    // 📦 Fetch Method forms
    const methods = await methodModel
    .find()
    .populate("userId","userName email");

    return responseHandler(
      res,
      200,
        methods,
      "All Methods fetched successfully"
    );
  } catch (error) {
    return responseHandler(
      res,
      500,
      {},
      `Internal server error: ${error.message}`,
      false
    );
  }
};

export const deleteMethodForms = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔐 admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    const methodForm = await methodModel.findById(id);

    if (!methodForm) {
      return responseHandler(res, 404, {}, "Method not found", false);
    }

    await methodModel.findByIdAndDelete(id);

    return responseHandler(res, 200, {}, "Method deleted successfully");
  } catch (error) {
    return responseHandler(res, 500, {}, error.message, false);
  }
};


// site 
export const getAllSites = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    // 📊 Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // 🔍 aggregation pipeline
    const sites = await siteModel.aggregate([
      {
        $lookup: {
          from: "users", // collection name
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          $or: [
            { "user.email": { $regex: search, $options: "i" } },
            { "user.userName": { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    // 📊 total count
    const totalSites = await siteModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          $or: [
            { "user.email": { $regex: search, $options: "i" } },
            { "user.userName": { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $count: "total",
      },
    ]);

    const total = totalSites[0]?.total || 0;

    return responseHandler(
      res,
      200,
      {
        sites,
        totalSites: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
      "All sites fetched successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      {},
      `Internal server error: ${error.message}`,
      false
    );
  }
};

export const deleteSite = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    const { id } = req.params;

    const site = await siteModel.findById(id);

    if (!site) {
      return responseHandler(res, 404, {}, "Site not found", false);
    }

    // ☁️ delete from cloudinary (if exists)
    if (site.publicId) {
      await cloudinary.uploader.destroy(site.publicId);
    }

    // 🗑️ delete from DB
    await siteModel.findByIdAndDelete(id);

    return responseHandler(
      res,
      200,
      {},
      "Site deleted successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      error.message,
      "Internal Server Error Delete Site",
      false
    );
  }
};

export const updateSite = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    const { id } = req.params;

    const {
      subDomain,
      customDomain,
      serverIp,
      sitePublicLink
    } = req.body;

    const site = await siteModel.findById(id).populate("user","userName email sitePublicLink");

    if (!site) {
      return responseHandler(res, 404, {}, "Site not found", false);
    }

    // ✏️ update fields (only if provided)
    if (subDomain !== undefined) site.subDomain = subDomain;
    if (customDomain !== undefined) site.customDomain = customDomain;
    if (sitePublicLink !== undefined) site.sitePublicLink = sitePublicLink;
    if (serverIp !== undefined) site.serverIp = serverIp;

    const updated = await site.save();


    if (sitePublicLink !== undefined) {
      const html = siteLiveEmailTemplate(site.user.userName, process.env.CPANEL_URL, sitePublicLink);

      await sendEmail(site.user.email, "Your Website is Live 🚀", html);
    }

    return responseHandler(
      res,
      200,
      updated,
      "Site updated successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      error.message,
      "Internal Server Error Update Site",
      false
    );
  }
};


  // get All contect form
export const getAllContectForm = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(res, 403, {}, "Access denied", false);
    }

    const allContect = await contectModel.find();
    
    if (!allContect) {
      return responseHandler(res,404,{},"Contects Not Found",false);
    }

    return responseHandler(
      res,
      200,
      allContect,
      "All Contect Get successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      {},
      `Internal server error get All contect form: ${error.message}`,
      false
    );
  }
};

// ================= DELETE CONTACT =================
export const deleteContectForm = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user?.role !== "admin") {
      return responseHandler(
        res,
        403,
        {},
        "Access denied",
        false
      );
    }

    const { id } = req.params;

    // 🔍 Find contact
    const contect = await contectModel.findById(id);

    if (!contect) {
      return responseHandler(
        res,
        404,
        {},
        "Contect not found",
        false
      );
    }

    // 🗑️ Delete
    await contectModel.findByIdAndDelete(id);

    return responseHandler(
      res,
      200,
      {},
      "Contect deleted successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      {},
      `Internal server error delete contect: ${error.message}`,
      false
    );
  }
};
