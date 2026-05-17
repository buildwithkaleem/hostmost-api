
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { responseHandler } from "../utils/responseHandler.js";
import { generateVerifyToken, verifyToken } from "../utils/token.js";
import { sendEmail } from "../service/sendEmail.service.js";
import { adminNewApplicationTemplate, freeServiceApprovedTemplate, resetPasswordTemplate, verifyEmailTemplate } from "../utils/htmlTemlate.js";
import { verifyPassword } from "../utils/hash.js";
import { methodModel } from "../models/method.model.js";
import { contectModel } from "../models/contect.model.js";
// import cloudinary from "../config/cloudinary.js";
// import fs from "node:fs";

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return responseHandler(res, 409, {}, "User already exists", false);
    }

    const user = await userModel.create({ userName, email, password });


    const token = generateVerifyToken(user._id, user.role);

    const verifyLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

    const html = verifyEmailTemplate(user.userName, verifyLink)

    await sendEmail(email, "Verify your account", html);

    return responseHandler(res, 201, user, "User registered");


  } catch (error) {
    console.log(error)
    return responseHandler(res, 500, null, `internal server error register ${error.message}`, false)
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = verifyToken(token);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    if (user.isVerified) {
      return responseHandler(res, 400, {}, "Already verified", false);
    }

    user.isVerified = true;
    await user.save();

    return responseHandler(res, 200, {}, "Email verified successfully");
  } catch (error) {
    return responseHandler(res, 400, {}, "Invalid or expired token", false);
  }
};

export const resendVerification = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) return responseHandler(res, 404, {}, "User not found", false);

  if (user.isVerified)
    return responseHandler(res, 400, {}, "Already verified", false);

  const token = generateVerifyToken(user._id);

  const link = `${process.env.BASE_URL}/verify-email?token=${token}`;

  const html = verifyEmailTemplate(user.userName, link)

  await sendEmail(email, "Verify your account", html);

  return responseHandler(res, 200, {}, "Verification email resent");
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseHandler(res, 400, {}, "Email and password are required", false);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return responseHandler(res, 401, {}, "Invalid email or password", false);
    }

    const comparePassword = await verifyPassword(user.password, password);

    if (!comparePassword) {
      return responseHandler(res, 401, {}, "Invalid email or password", false);
    }

    if (!user.isVerified) {

      const token = generateVerifyToken(user._id, user.role);

      const verifyLink = `${process.env.BASE_URL}/verify-email?token=${token}`;

      const html = verifyEmailTemplate(user.userName, verifyLink)

      await sendEmail(email, "Verify your account", html);

      return responseHandler(res, 403, {}, "Please verify your email", false);
    }

    const token = generateVerifyToken(user._id, user.role);

    return responseHandler(
      res,
      200,
      { user },
      "Login successful",
      true,
      [
        {
          name: "Token",
          value: token,
          options: {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          },
        },
      ]
    );

  } catch (error) {
    return responseHandler(res, 500, {}, `internal server error ${error.message}`, false);
  }
};

export const logout = async (req, res) => {

  try {
    return responseHandler(
      res,
      200,
      {},
      "Logout successful",
      true,
      [
        {
          name: "Token",
          value: "",
          options: {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 0, // cookie expire immediately
          },
        },
      ]
    );
  } catch (error) {
    return responseHandler(
      res,
      500,
      {},
      `internal server error logout ${error.message}`,
      false
    );
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      // security: same message
      return responseHandler(res, 404, {}, "User not exists", false);
    }

    if (!user.isVerified) {
      return responseHandler(res, 403, {}, "Please verify your email", false);
    }

    const token = generateVerifyToken(user._id, user.role, "10m");

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

    const html = resetPasswordTemplate(user.userName, resetLink)

    await sendEmail(email, "Reset Password", html);

    return responseHandler(res, 200, {}, "Reset link sent to email");
  } catch (error) {
    return responseHandler(res, 500, {}, error.message, false);
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const decoded = verifyToken(token);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    // const hashedPassword = await hashPassword(password);

    user.password = newPassword;
    await user.save();

    return responseHandler(res, 200, {}, "Password reset successful");
  } catch (error) {
    return responseHandler(res, 400, {}, "Invalid or expired token", false);
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user?.id; // middleware se aayega

    if (!userId) {
      return responseHandler(res, 401, {}, "Unauthorized", false);
    }

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    return responseHandler(res, 200, user, "User fetched successfully");
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


// third

export const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }


    // 🌟 Cloudinary data (middleware se aa raha hai)
    const imageUrl = req.file.cloudUrl;

    user.profilePic = imageUrl;
    await user.save();

    return responseHandler(
      res,
      200,
      user,
      "Profile picture uploaded successfully"
    );

  } catch (error) {
    console.log(process.env.CLOUD_NAME);
    console.log(process.env.CLOUD_API_KEY);
    return responseHandler(res, 500, {}, error.message, false);
  }
};


export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return responseHandler(res, 404, {}, "User not found", false);
    }

    const isMatch = verifyPassword(user.password, oldPassword)

    // const isMatch = user.password === oldPassword;

    if (!isMatch) {
      return responseHandler(res, 400, {}, "Old password is incorrect", false);
    }

    user.password = newPassword;
    await user.save();

    return responseHandler(
      res,
      200,
      {},
      "Password updated successfully"
    );
  } catch (error) {
    return responseHandler(res, 500, {}, error.message, false);
  }
};

// pyment method form
export const method = async (req, res) => {
  try {

    const userId = req.user?.id;

    const { firstName, lastName, addressLine1, addressLine2, city, country, zipCode, phoneNumber, cardType, cardNumber, expirationMonth, expirationYear, cvn } = req.body;


    if (!firstName || !lastName || !addressLine1 || !city || !country || !zipCode || !phoneNumber || !cardType || !cardNumber || !expirationMonth || !expirationYear || !cvn ){
      return responseHandler(res,403,null,"All Fields are Required",false);
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return responseHandler(res, 404, null, "User not Found", false);
    }

    const cardNumberExists = await methodModel.findOne({ cardNumber });
    if (cardNumberExists) {
      return responseHandler(res, 409, {}, "Card Number already exists", false);
    }

    // const addressLine1Exists = await methodModel.findOne({ addressLine1 });
    // if (addressLine1Exists) {
    //   return responseHandler(res, 409, {}, "Address Line1 already exists", false);
    // }

    const method = await methodModel.create({
      userId: user._id,
      firstName, lastName, addressLine1, addressLine2, city, country, zipCode, phoneNumber, cardType, cardNumber, expirationMonth, expirationYear, cvn
    });

    // Number(expirationMonth)

    // if (expirationMonth < 12){
    //   return responseHandler(res, 409, null, "Invalid Expire of Month", false);
    // }

    // if (!method) {
    //   return responseHandler(res, 409, null, "Method Craetion Error", false);
    // }


    const html = freeServiceApprovedTemplate(user.userName,)

    const receiveHtml = adminNewApplicationTemplate(user.userName, user.email)

    await sendEmail(user.email, "Your Free Hosting Service is Approved 🎉", html);

    await sendEmail("admin@gmail.com", "New Free Hosting Application Request", receiveHtml);

    return responseHandler(res, 201, method, "Method Successfuly Created")

  }catch (error) {
      console.log("FULL ERROR:", error);

      return res.status(500).json({
        message: error.message,
        error: error
      })
    }
  };


  // Contect form
export const contect = async (req, res) => {

  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;

    // ✅ validation
    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {

      return responseHandler(
        res,
        400,
        {},
        "All fields are required",
        false
      );

    }

    // ✅ create contact
    const contectData = await contectModel.create({
      name,
      email,
      subject,
      message,
    });

    // ✅ success response
    return responseHandler(
      res,
      201,
      contectData,
      "Message sent successfully"
    );

  } catch (error) {

    console.log(error);

    return responseHandler(
      res,
      500,
      error.message,
      "Internal Server Error Contact",
      false
    );

  }

};