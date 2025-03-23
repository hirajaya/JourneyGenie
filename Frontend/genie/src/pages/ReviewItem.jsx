import { useState } from "react";
import { updateReview, deleteReview, likeReview } from "../pages/ReviewService.js";

const ReviewItem = ({ review, onReviewUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [newComment, setNewComment] = useState(review.comment);

  const handleUpdate = async () => {
    await updateReview(review._id, { comment: newComment });
    setEditing(false);
    onReviewUpdated();
  };

  const handleDelete = async () => {
    await deleteReview(review._id);
    onReviewUpdated();
  };

  const handleLike = async () => {
    await likeReview(review._id);
    onReviewUpdated();
  };

  return (
    <div className="p-3 bg-white shadow rounded-lg my-2">
      {editing ? (
        <input 
          type="text" 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      ) : (
        <p>{review.comment} - {review.rating}⭐</p>
      )}

      <div className="flex space-x-2 mt-2">
        {editing ? (
          <button onClick={handleUpdate} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
        )}
        <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
        <button onClick={handleLike} className="px-3 py-1 bg-yellow-500 text-white rounded">Like {review.likes}</button>
      </div>
    </div>
  );
};

export default ReviewItem;
