import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Package',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;