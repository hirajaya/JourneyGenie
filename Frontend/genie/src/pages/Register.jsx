import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    gender: '',
    dob: '',
    address: '',
    province: '',
    profilePicture: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users', formData);
      toast.success('Registration Successful!');
      console.log(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/bgImage.jpg')" }} 
    >
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />
      <ToastContainer position="top-left" autoClose={3000} />

      <form
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create Account</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'username', label: 'Username' },
            { name: 'name', label: 'Full Name' },
            { name: 'email', label: 'Email Address', type: 'email' },
            { name: 'phone', label: 'Phone Number' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'age', label: 'Age' },
            { name: 'dob', label: 'Date of Birth', type: 'date' },
            { name: 'address', label: 'Address' },
            { name: 'province', label: 'Province' },
            { name: 'profilePicture', label: 'Profile Picture URL' },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type || 'text'}
                value={formData[field.name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 transition text-white w-full py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-pink-600 underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
