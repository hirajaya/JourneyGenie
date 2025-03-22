import express from 'express';
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage
} from '../Controllers/packageController.js';

const router = express.Router();

router.post('/create', createPackage);
router.get('/getall', getAllPackages);
router.get('/:id', getPackageById);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

export default router;
