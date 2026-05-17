
import { userModel } from "../models/user.model.js";
import { responseHandler } from "../utils/responseHandler.js";
import { sendEmail } from "../service/sendEmail.service.js";
import { siteModel } from "../models/site.model.js";
import { adminSiteSetupStartedTemplate, siteLiveSoonEmail } from "../utils/htmlTemlate.js";
import cloudinary from "../config/cloudinary.js";



export const domainAdd = async (req, res) => {
  try {
    const {id} = req.user;
    const { subDomain, customDomain } = req.body;

    if (!subDomain && !customDomain){
      return responseHandler(res, 403, {},"Select Domain ",false)
}    

    const user = await userModel.findById(id);
    // console.log(user)
    if (!user) {
      return responseHandler(res, 404, {}, "User not Found", false);
    }

    if (user.status !== "approved"){
      return responseHandler(res,409,{},"You not authorized for cPanel",false)
    }

    const siteData = await siteModel.create({
      user: user._id,
      subDomain,
      customDomain,
    });


    return responseHandler(res, 201, siteData, ` Your Domain Add Successfully `);

  } catch (error) {
    console.log(error)
    return responseHandler(res, 500, error.message, "internal Server Error Site Domain", false);
  }
};

export const domainDelete = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return responseHandler(res, 400, {}, "Invalid ID", false);
    }

    const siteRecord = await siteModel.findById(id);

    if (!siteRecord) {
      return responseHandler(res, 404, {}, "Site record not found", false);
    }


    // ✅ DELETE DOMAIN
    siteRecord.subDomain = "";
    siteRecord.customDomain = "";

    const deleted = await siteRecord.save();

    return responseHandler(res, 200, deleted, "Domain deleted successfully");

  } catch (error) {
    return responseHandler(
      res,
      500,
      error.message,
      "Internal Server Error Site Domain Update And Delete",
      false
    );
  }
};


export const DomainUpdate = async (req, res) => {
  try {

    const userId = req.user?.id;
    const { subDomain, customDomain } = req.body;

    if (!subDomain && !customDomain) {
      return responseHandler(res, 403, {}, "Select Domain ", false)
    }   

    const siteRecord = await siteModel
    .findOne({user:userId})
      .populate("user","userName email");

    if (!siteRecord) {
      return responseHandler(res, 404, {}, "Site record & User not found", false);
    }

    // ✅ UPDATE DOMAIN
    siteRecord.subDomain = subDomain || "";
    siteRecord.customDomain = customDomain || "";

    const Update = await siteRecord.save();

    // success mail send
    const html = siteLiveSoonEmail(siteRecord.user.userName, process.env.CPANEL_URL);

    const reseveHtml = adminSiteSetupStartedTemplate(siteRecord.user.userName, siteRecord.user.email, process.env.CPANEL_URL)

    await sendEmail(siteRecord.user.email, "Website Setup in Progress", html);

    await sendEmail(process.env.FROM_EMAIL, "Site Setup Started", reseveHtml);

    return responseHandler(res, 200, Update, "Domain Update successfully");

  } catch (error) {
    return responseHandler(
      res,
      500,
      error.message,
      `Internal Server Error Site Domain Update  `,
      false
    );
  }
};


export const sourceAdd = async (req, res) => {
    try {
      const userId = req.user?.id;

      let source = req.file.cloudUrl;
      let publicId = req.file.cloudId;

      if (!source || !req.file) {
        return responseHandler(res, 400, {}, "No source File uploaded", false);
      }

      const site = await siteModel
      .findOne({ user: userId })
      .populate("user", "userName email status");;
      
      if (!site) {
        return responseHandler(res, 404, {}, "Domain Add First", false);
      }

      if (site.user.status !== "approved"){
        return responseHandler(res,409,{},"You not authorized for cPanel",false)
      }

      site.source = source;
      site.publicId = publicId;
      await site.save();

      // success mail send
      const html = siteLiveSoonEmail(site.user.userName, process.env.CPANEL_URL);

      const reseveHtml = adminSiteSetupStartedTemplate(site.user.userName, site.user.email, process.env.CPANEL_URL)

      await sendEmail(site.user.email, "Website Setup in Progress", html);

      await sendEmail(process.env.FROM_EMAIL, "Site Setup Started", reseveHtml);


      return responseHandler(res, 201, site, ` Source Add Successfully `);

    } catch (error) {
      return responseHandler(res, 500, error.message, "internal Server Error Site Source", false);
    }
  };

export const deleteSiteSource = async (req, res) => {
  try {
    const { id } = req.params;

    const siteRecord = await siteModel.findById(id);

    if (!siteRecord) {
      return responseHandler(res, 404, {}, "Site record not found", false);
    }

    if (!siteRecord.source) {
      return responseHandler(res, 400, {}, "No source to delete", false);
    }

    // ✅ correct public_id extract
    // const getPublicId = (url) => {
    //   const parts = url.split("/documents/")[1];
    //   const withoutVersion = parts.split("/").slice(1).join("/");
    //   return withoutVersion.split(".")[0];
    // };

    const publicId = siteRecord.publicId

    console.log("Deleting:", publicId);

    // 🧹 delete from cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    console.log("Cloudinary result:", result);

    // 🗑️ remove from DB
    // siteRecord.source = null;
    // const updated = await siteRecord.save();
    const updated = await siteModel.findByIdAndUpdate(
      id,
      { source: "", publicId: "" },
      { returnDocument: "after" }
    );

    return responseHandler(
      res,
      200,
      { updated, cloudinary: result },
      "Source deleted successfully"
    );

  } catch (error) {
    return responseHandler(
      res,
      500,
      error.message,
      "Internal Server Error Delete Source",
      false
    );
  }
};

export const getSite = async (req,res) => {
  try {
    const {id} = req.user;

    const user = await userModel.findById(id);
    // console.log(user)
    if (!user) {
      return responseHandler(res, 404, {}, "User not Found", false);
    }

    if (user.status !== "approved") {
      return responseHandler(res, 409, {}, "You not authorized for cPanel", false)
    }

    const site = await siteModel.findOne({user : id});

    return responseHandler(res, 200, site,"user Site successfuly fetched")


  } catch (error) {
    return responseHandler(res, 409, {error:error.message}, "Internal server Error get site", false)
  }
}