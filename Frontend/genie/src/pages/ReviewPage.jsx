import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaThumbsUp, FaTrash, FaEdit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PackageReviews = ({ packageId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [packageId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/package/${packageId}`);
      setReviews(res.data);
    } catch (err) {
      toast.error('Failed to fetch reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: userId,
      package: packageId,
      rating,
      comment,
    };

    try {
      if (editingReviewId) {
        await axios.put(`http://localhost:5000/api/reviews/${editingReviewId}`, payload);
        toast.success('Review updated!');
        setEditingReviewId(null);
      } else {
        await axios.post('http://localhost:5000/api/reviews', payload);
        toast.success('Review added!');
      }

      setComment('');
      setRating(0);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const likeReview = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/reviews/like/${id}`);
      fetchReviews();
    } catch (err) {
      toast.error('Failed to like review');
    }
  };

  const handleEdit = (review) => {
    setComment(review.comment);
    setRating(review.rating);
    setEditingReviewId(review._id);
    toast.info('Edit mode enabled');
  };

  const confirmDelete = (id) => {
    setReviewToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewToDelete}`);
      toast.success('Review deleted');
      fetchReviews();
    } catch (err) {
      toast.error('Failed to delete review');
    } finally {
      setShowDeleteConfirm(false);
      setReviewToDelete(null);
    }
  };

  return (
    <div className="bg-black rounded-xl shadow-xl p-6 mt-10 max-w-3xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">User Reviews</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex justify-center gap-2 text-yellow-500 text-xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <FaStar className={star <= (hover || rating) ? 'fill-current' : 'text-gray-300'} />
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your experience..."
          className="w-full border rounded-lg p-3 resize-none"
          rows={4}
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
        >
          {editingReviewId ? 'Update Review' : 'Submit Review'}
        </button>
      </form>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet. Be the first to share!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-pink-600">{r.user?.name}</div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < r.rating ? 'fill-current' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{r.comment}</p>
              <div className="mt-2 text-sm text-gray-500 flex items-center gap-4">
                <button
                  onClick={() => likeReview(r._id)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <FaThumbsUp /> {r.likes}
                </button>

                {r.user?._id === userId && (
                  <>
                    <button
                      onClick={() => handleEdit(r)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => confirmDelete(r._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this review?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageReviews;