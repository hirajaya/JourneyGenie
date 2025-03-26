import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/SideBar.jsx';

const PaymentPage = () => {
  const { id } = useParams(); 
  const [pkg, setPkg] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    paymentMethod: 'Credit Card',
  });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.error('Error loading package:', err);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/payments', {
        ...formData,
        user: userId,
        packageId: id,
        amount: pkg.totalPrice,
      });
      alert('Payment Successful!');
      navigate('/home');
    } catch (err) {
      alert('Payment Failed');
    }
  };

  if (!pkg) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/profile-bg.jpg')" }}>
      
      <div className="z-50 relative">
        <Sidebar />
      </div>

      <div className="absolute inset-0 bg-opacity-40 backdrop-blur-md z-0" />

      <div className="ml-64 w-full p-10 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
            Complete Your Payment
          </h1>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{pkg.packageName}</h2>
            <p className="text-gray-600">Destination: {pkg.destination}</p>
            <p className="text-gray-700 font-semibold mt-2">Total Price: Rs. {pkg.totalPrice.toFixed(2)}</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              >
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>UPI</option>
                <option>PayPal</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                placeholder="xxxx xxxx xxxx xxxx"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition"
            >
              Pay Rs. {pkg.totalPrice.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
