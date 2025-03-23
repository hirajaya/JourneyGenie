import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

// Fetch all reviews for a package
export const fetchReviews = async (packageId) => {
  const response = await axios.get(`${API_URL}/${packageId}`);
  return response.data;
};

// Submit a new review
export const submitReview = async (reviewData) => {
  const response = await axios.post(API_URL, reviewData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Update an existing review
export const updateReview = async (reviewId, updatedData) => {
  const response = await axios.put(`${API_URL}/${reviewId}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId) => {
  await axios.delete(`${API_URL}/${reviewId}`);
};

// Like a review (increments like count)
export const likeReview = async (reviewId) => {
  const response = await axios.patch(`${API_URL}/${reviewId}/like`);
  return response.data;
};
