import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();


// admin routes
router.get('/all-users', protect, adminController.getAllUser);
router.get('/search-users', protect, adminController.getAllUser);
router.put('/update-user/:id', protect, adminController.updateUser);
router.delete('/delete-user/:id', protect, adminController.deleteUser);
router.put("/status/:id", protect, adminController.approveFreeHosting);

// method form
router.get('/get-all-methods', protect, adminController.getAllMethodForms);
router.delete('/delete-method/:id', protect, adminController.deleteMethodForms);

// site
router.get('/get-all-sites', protect, adminController.getAllSites);
router.get('/search-sites', protect, adminController.getAllSites);
router.delete("/site-delete/:id", protect, adminController.deleteSite);
router.put("/site-update/:id", protect, adminController.updateSite);


// contet form
router.get("/get-all-contects", protect, adminController.getAllContectForm);
router.delete(
  "/delete-contect/:id",
  protect,
  adminController.deleteContectForm
);

export default router;