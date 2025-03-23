import { useEffect, useState } from "react";
import { fetchReviews } from "../pages/ReviewService.js";
import ReviewItem from "./ReviewItem.jsx";

const ReviewList = ({ packageId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const loadReviews = async () => {
    const data = await fetchReviews(packageId);
    setReviews(data);

    // Calculate average rating
    if (data.length > 0) {
      const total = data.reduce((acc, review) => acc + review.rating, 0);
      setAverageRating((total / data.length).toFixed(1));
    } else {
      setAverageRating(0);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [packageId]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-3">Trip Reviews</h2>

      {/* Average Rating */}
      <div className="flex items-center mb-4">
        <span className="text-yellow-500 text-lg font-bold">{averageRating} stars</span>
        <span className="ml-2 text-gray-600"> - based on {reviews.length} reviews</span>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review._id} review={review} onReviewUpdated={loadReviews} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
