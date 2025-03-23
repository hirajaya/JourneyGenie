import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tourist: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Tourist", 
      required: true 
    },
    packageId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Package", 
      required: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: [1, "Rating must be at least 1"], 
      max: [5, "Rating cannot be more than 5"] 
    },
    comment: { 
      type: String, 
      required: [true, "Comment is required"], 
      trim: true, 
      minlength: [5, "Comment must be at least 5 characters"], 
      maxlength: [500, "Comment cannot exceed 500 characters"] 
    },
    likes: { 
      type: Number, 
      default: 0, 
      min: 0 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date 
    }
  },
  { timestamps: true } // This automatically adds `createdAt` and `updatedAt`
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;

