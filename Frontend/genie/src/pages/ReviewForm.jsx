import { useState } from "react";
import { submitReview } from "../pages/ReviewService.js";

const ReviewForm = ({ packageId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment.length < 5) {
      setError("Please provide a rating and a comment with at least 5 characters.");
      return;
    }

    await submitReview({ packageId, rating, comment });
    setRating(0);
    setComment("");
    setError("");
    onReviewAdded(); // Reload reviews
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Star Rating Selection */}
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-2xl cursor-pointer ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => setRating(i + 1)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment Input */}
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button onClick={handleSubmit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default ReviewForm;
