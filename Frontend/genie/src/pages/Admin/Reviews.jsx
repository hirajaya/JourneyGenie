import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar.jsx';
import { FaStar, FaThumbsUp, FaFileDownload } from 'react-icons/fa';

const Reviews = () => {
  const [reviewsByPackage, setReviewsByPackage] = useState({});
  const [mostLikedReviews, setMostLikedReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reviews');
        const grouped = groupByPackage(res.data);
        setReviewsByPackage(grouped);
      } catch (err) {
        console.error('Error fetching reviews:', err.message);
      }
    };

    fetchReviews();
  }, []);

  const groupByPackage = (reviews) => {
    return reviews.reduce((acc, review) => {
      const packageName = review.package?.packageName || 'Unknown Package';
      if (!acc[packageName]) {
        acc[packageName] = [];
      }
      acc[packageName].push(review);
      return acc;
    }, {});
  };

  const generateMostLikedReport = () => {
    const allReviews = Object.values(reviewsByPackage).flat();
    const sorted = [...allReviews].sort((a, b) => b.likes - a.likes);
    const topReviews = sorted.filter((r) => r.likes > 0).slice(0, 5); // Top 5 liked reviews
    setMostLikedReviews(topReviews);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex"
      style={{ backgroundImage: "url('/bgImage.jpg')" }}
    >
      <AdminNavbar />

      <div className="flex-1 relative p-8 z-10">
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />

        <div className="relative bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-6xl mx-auto z-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-black">Package Reviews</h1>
            <button
              onClick={generateMostLikedReport}
              className="flex items-center gap-2 bg-pink-700 hover:bg-pink-800 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <FaFileDownload />
              Generate Report
            </button>
          </div>

          {Object.keys(reviewsByPackage).length === 0 ? (
            <p className="text-center text-gray-500">No reviews available.</p>
          ) : (
            Object.entries(reviewsByPackage).map(([packageName, reviews]) => (
              <div key={packageName} className="mb-12">
                <h2 className="text-xl font-bold text-pink-700 mb-4 border-b pb-2">
                  {packageName}
                </h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse text-center mb-6">
                    <thead>
                      <tr className="bg-pink-700 text-white rounded-lg">
                        <th className="px-4 py-3 rounded-tl-lg">User</th>
                        <th className="px-4 py-3">Rating</th>
                        <th className="px-4 py-3">Comment</th>
                        <th className="px-4 py-3 rounded-tr-lg">Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((r, idx) => (
                        <tr
                          key={r._id}
                          className={`${
                            idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                          } hover:bg-pink-50 transition`}
                        >
                          <td className="px-4 py-2 font-medium text-pink-700">
                            {r.user?.name || 'Unknown'}
                          </td>
                          <td className="px-4 py-2 flex justify-center items-center gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < r.rating ? 'fill-current' : 'text-gray-300'} />
                            ))}
                          </td>
                          <td className="px-4 py-2 text-gray-700">{r.comment}</td>
                          <td className="px-4 py-2 text-blue-600 font-semibold flex items-center justify-center gap-1">
                            <FaThumbsUp /> {r.likes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}

          {mostLikedReviews.length > 0 && (
            <div className="mt-16 border-t pt-8">
              <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                🔥 Most Liked Reviews Report
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse text-center">
                  <thead>
                    <tr className="bg-green-700 text-white">
                      <th className="px-4 py-3 rounded-tl-lg">Package</th>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Comment</th>
                      <th className="px-4 py-3 rounded-tr-lg">Likes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mostLikedReviews.map((r, idx) => (
                      <tr
                        key={r._id}
                        className={`${
                          idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        } hover:bg-green-50 transition`}
                      >
                        <td className="px-4 py-2 font-semibold text-green-800">
                          {r.package?.packageName || 'Unknown'}
                        </td>
                        <td className="px-4 py-2 text-green-600 font-medium">
                          {r.user?.name || 'Unknown'}
                        </td>
                        <td className="px-4 py-2 text-gray-700">{r.comment}</td>
                        <td className="px-4 py-2 text-blue-600 font-bold flex items-center justify-center gap-1">
                          <FaThumbsUp /> {r.likes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
