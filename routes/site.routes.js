import express from 'express';
import * as siteController from '../controllers/site.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadToCloudinary } from "../middleware/upload.middleware.js";

const router = express.Router();


router.post('/domain-add', protect, siteController.domainAdd);


router.delete("/domain-delete/:id", protect, siteController.domainDelete);

router.post("/domain-update", protect, siteController.DomainUpdate);

router.post('/source-add', protect, uploadToCloudinary("source", "hostmost/documents"), siteController.sourceAdd);

router.delete("/source-delete/:id", protect, siteController.deleteSiteSource);

router.get("/get", protect, siteController.getSite);




export default router;