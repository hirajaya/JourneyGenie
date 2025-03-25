import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewsByPackage,
  likeReview,
  updateReview,
  deleteReview,
} from '../Controllers/ReviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/package/:packageId', getReviewsByPackage);
router.put('/like/:id', likeReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
