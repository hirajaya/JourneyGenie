import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/SideBar.jsx';
import { MdEmail, MdPhone, MdCalendarToday, MdLocationOn, MdHome } from 'react-icons/md';
import { FaVenusMars, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
  }, [username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedData = { ...formData };
      if (!updatedData.password) {
        updatedData.password = user.password;
      }
      const res = await axios.put(`http://localhost:5000/api/users/${username}`, updatedData);
      setUser(res.data);
      setEditMode(false);
      toast.success('User updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update user');
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${username}`);
      localStorage.removeItem('loggedInUser');
      toast.success('Account deleted successfully');
      setTimeout(() => {
        navigate('/register');
      }, 1500);
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    toast.info('Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />
      <Sidebar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="ml-64 p-8 w-full relative z-10 text-white min-h-screen">
        <h1 className="text-4xl font-bold mb-6">User Profile</h1>

        {user ? (
          <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto hover:shadow-xl transition text-gray-800">
            <div className="flex items-center space-x-6">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-pink-300 ring-4 ring-white shadow-lg object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold text-pink-600 mb-1">{user.name}</h2>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>

            {editMode ? (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                {['name', 'email', 'phone', 'age', 'gender', 'dob', 'province', 'address'].map((field) => (
                  <div key={field}>
                    <label className="font-semibold block mb-1 capitalize">{field}</label>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      type={field === 'dob' ? 'date' : 'text'}
                      className="w-full border border-gray-300 px-3 py-2 rounded"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1">Profile Picture URL</label>
                  <input
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
                <button
                  onClick={handleUpdate}
                  className="sm:col-span-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                <p className="flex items-center gap-2">
                  <MdEmail className="text-pink-600 text-xl" />
                  <span><strong>Email:</strong> {user.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdPhone className="text-pink-600 text-xl" />
                  <span><strong>Phone:</strong> {user.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaUser className="text-pink-600 text-xl" />
                  <span><strong>Age:</strong> {user.age}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaVenusMars className="text-pink-600 text-xl" />
                  <span><strong>Gender:</strong> {user.gender}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdCalendarToday className="text-pink-600 text-xl" />
                  <span><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdLocationOn className="text-pink-600 text-xl" />
                  <span><strong>Province:</strong> {user.province}</span>
                </p>
                <p className="sm:col-span-2 flex items-center gap-2">
                  <MdHome className="text-pink-600 text-xl" />
                  <span><strong>Address:</strong> {user.address}</span>
                </p>
              </div>
            )}

            <div className="flex justify-between mt-10 flex-wrap gap-3">
              <button
                onClick={() => setEditMode((prev) => !prev)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              >
                {editMode ? 'Cancel Edit' : 'Update Details'}
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white text-xl text-center mt-12">Loading user info...</p>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Confirm Account Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete your account?</p>
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

export default UserDetails;
