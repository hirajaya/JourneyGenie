import express from 'express';
import { createPackage } from '../Controllers/CustomPackageController.js';

const router = express.Router();

router.post('/create', createPackage);

export default router;