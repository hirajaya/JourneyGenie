import express from 'express';
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from '../Controllers/PackageController.js';

const router = express.Router();

router.route('/')
  .post(createPackage)
  .get(getAllPackages);

router.route('/:id')
  .get(getPackageById)
  .put(updatePackage)
  .delete(deletePackage);

export default router;
