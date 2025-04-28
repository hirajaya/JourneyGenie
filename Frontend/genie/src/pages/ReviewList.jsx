import { useEffect, useState } from "react";
import { fetchReviews, likeReview } from "../pages/ReviewService.js";

const ReviewList = ({ packageId }) => {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const data = await fetchReviews(packageId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleLike = async (reviewId) => {
    try {
      await likeReview(reviewId);
      loadReviews();
    } catch (error) {
      console.error("Error liking review:", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [packageId]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="p-3 mb-3 border rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{review.comment}</p>
              <button
                onClick={() => handleLike(review._id)}
                className="text-blue-500 text-sm hover:underline"
              >
                👍 {review.likes}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Rating: {review.rating} | {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
