import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';


import { uploadToCloudinary } from "../middleware/upload.middleware.js";



const router = express.Router();


router.post('/register', authController.register);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/login', authController.login);
router.post('/logout', protect, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/me', protect, authController.getUser);



router.post(
  "/upload-profile-pic",
  protect,
  uploadToCloudinary("profile", "hostmost/profile_pics"),
  authController.uploadProfilePic
);

router.post("/change-password", protect, authController.changePassword
);

router.post("/method-create", protect,
  authController.method
);

// contect form
router.post("/contect", authController.contect);

export default router;