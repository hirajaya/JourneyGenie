import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      toast.success('Login successful!');
      console.log(res.data);

      localStorage.setItem('loggedInUser', username);
      localStorage.setItem('userId', res.data._id);

      setTimeout(() => {
        if (username === 'amys123' && password === 'amysant3') {
          navigate('/admin-dashboard');
        } else {
          navigate('/home');
        }
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
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
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Login</h2>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 transition text-white w-full py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
