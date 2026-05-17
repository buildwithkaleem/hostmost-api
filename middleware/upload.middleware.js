
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

import { responseHandler } from "../utils/responseHandler.js";

import cloudinary from "../config/cloudinary.js";

// ================= TEMP FOLDER =================
// ✅ Vercel compatible temp folder
const tempPath = "/tmp/";

if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

// ================= MULTER STORAGE =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {
  // ❌ blocked extensions
  const blockedExt = [
    ".exe",
    ".js",
    ".bat",
    ".cmd",
    ".sh",
    ".msi",
  ];

  const ext = path
    .extname(file.originalname)
    .toLowerCase();

  if (blockedExt.includes(ext)) {
    return cb(
      new Error(
        `Files with ${ext} extension are not allowed`
      ),
      false
    );
  }

  // ✅ allowed MIME types
  const allowedMimeTypes = [
    // images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",

    // zip / source files
    "application/zip",
    "application/x-zip-compressed",
    "multipart/x-zip",

    // rar
    "application/vnd.rar",

    // docs
    "application/pdf",

    // text/code
    "text/plain",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `Invalid file type: ${file.mimetype}`
      ),
      false
    );
  }

  cb(null, true);
};

// ================= MULTER =================
const upload = multer({
  storage,
  fileFilter,

  limits: {
    // ✅ 100MB max upload
    fileSize: 100 * 1024 * 1024,
  },
});

// ================= CLOUDINARY UPLOAD =================
export const uploadToCloudinary = (
  fieldName = "file",
  folder = "general"
) => {
  return (req, res, next) => {
    upload.single(fieldName)(
      req,
      res,
      async (err) => {
        // ================= MULTER ERRORS =================
        if (err) {
          // file too large
          if (err.code === "LIMIT_FILE_SIZE") {
            return responseHandler(
              res,
              400,
              {},
              "Max file size is 100MB",
              false
            );
          }

          return responseHandler(
            res,
            400,
            {},
            err.message,
            false
          );
        }

        // ================= NO FILE =================
        if (!req.file) {
          return responseHandler(
            res,
            400,
            {},
            "No file uploaded",
            false
          );
        }

        try {
          // ================= CLOUDINARY =================
          const result =
            await cloudinary.uploader.upload(
              req.file.path,
              {
                folder,
                resource_type: "auto",
              }
            );

          // ================= DELETE TEMP FILE =================
          if (
            req.file.path &&
            fs.existsSync(req.file.path)
          ) {
            fs.unlinkSync(req.file.path);
          }

          // ================= ATTACH CLOUDINARY DATA =================
          req.file.cloudUrl = result.secure_url;

          req.file.cloudId = result.public_id;

          req.file.cloudType = result.resource_type;

          next();
        } catch (error) {
          // ================= CLEANUP IF FAILED =================
          if (
            req.file &&
            req.file.path &&
            fs.existsSync(req.file.path)
          ) {
            fs.unlinkSync(req.file.path);
          }

          return responseHandler(
            res,
            500,
            {},
            `Cloudinary upload failed: ${error.message}`,
            false
          );
        }
      }
    );
  };
};