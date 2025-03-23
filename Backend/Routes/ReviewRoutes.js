import express from "express";
import { 
  createReview, 
  getReviewsByPackage, 
  updateReview, 
  deleteReview, 
  likeReview 
} from "../Controllers/ReviewController.js";

const router = express.Router();

router.post("/create", createReview);
router.get("/:packageId", getReviewsByPackage);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.patch("/:id/like", likeReview);

export default router;
