import axios from "axios";

// Base API URL for reviews
const API_URL = "http://localhost:5000/api/reviews";

// Fetch reviews for a specific package
export const fetchReviews = async (packageId) => {
  try {
    const response = await axios.get(`${API_URL}/${packageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error.response?.data || error.message);
    throw error;
  }
};

// Add a new review
export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(API_URL, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error.response?.data || error.message);
    throw error;
  }
};

// Like a specific review
export const likeReview = async (reviewId) => {
  try {
    const response = await axios.patch(`${API_URL}/${reviewId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking review:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a review by ID
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error.response?.data || error.message);
    throw error;
  }
};

// Update an existing review
export const updateReview = async (reviewId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${reviewId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error.response?.data || error.message);
    throw error;
  }
};
