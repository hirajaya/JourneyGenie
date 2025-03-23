import Review from "../Models/Review.js";

// @desc Create a new review
// @route POST /api/reviews
// @access Public
export const createReview = async (req, res) => {
  try {
    const { tourist, packageId, rating, comment } = req.body;

    if (!tourist || !packageId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const review = await Review.create({ tourist, packageId, rating, comment });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get all reviews for a package
// @route GET /api/reviews/:packageId
// @access Public
export const getReviewsByPackage = async (req, res) => {
  try {
    const reviews = await Review.find({ packageId: req.params.packageId }).populate("tourist", "name");
    
    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this package" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update a review
// @route PUT /api/reviews/:id
// @access Public
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.updatedAt = Date.now();

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Public
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Like a review
// @route PATCH /api/reviews/:id/like
// @access Public
export const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.likes += 1;
    await review.save();

    res.status(200).json({ message: "Review liked successfully", likes: review.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
