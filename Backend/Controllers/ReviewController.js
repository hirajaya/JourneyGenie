import Review from '../Models/Review.js';
import asyncHandler from '../Middleware/asyncHandler.js';

const createReview = asyncHandler(async (req, res) => {
  const { user, package: packageId, rating, comment } = req.body;

  if (!user || !packageId || !rating || !comment) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newReview = new Review({
    user,
    package: packageId,
    rating,
    comment,
  });

  const savedReview = await newReview.save();

  const populatedReview = await Review.findById(savedReview._id)
    .populate('user', 'name')
    .populate('package', 'packageName');

  res.status(201).json(populatedReview);
});

const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate('user', 'name')
    .populate('package', 'packageName');

  res.status(200).json(reviews);
});

const getReviewsByPackage = asyncHandler(async (req, res) => {
  const { packageId } = req.params;

  const reviews = await Review.find({ package: packageId })
    .populate('user', 'name')
    .populate('package', 'packageName');

  res.status(200).json(reviews);
});

const likeReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  review.likes += 1;
  await review.save();

  res.status(200).json({ message: 'Review liked', likes: review.likes });
});

const updateReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
  
    const review = await Review.findById(id);
  
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
  
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
  
    const updatedReview = await review.save();
  
    const populatedReview = await Review.findById(updatedReview._id)
      .populate('user', 'name')
      .populate('package', 'packageName');
  
    res.status(200).json(populatedReview);
  });
  

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  await review.deleteOne();

  res.status(200).json({ message: 'Review deleted successfully' });
});

export {
  createReview,
  getAllReviews,
  getReviewsByPackage,
  likeReview,
  updateReview,
  deleteReview,
};
