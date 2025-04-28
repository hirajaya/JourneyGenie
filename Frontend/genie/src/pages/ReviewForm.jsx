import { useState } from "react";
import { addReview } from "../pages/ReviewService.js";

const ReviewForm = ({ packageId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { packageId, rating, comment };
    try {
      await addReview(reviewData);
      onReviewAdded(); // Refresh the review list
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Write a Review</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-2 border rounded w-full"
          min="1"
          max="5"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 border rounded w-full"
          rows="4"
          minLength="5"
          maxLength="500"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

