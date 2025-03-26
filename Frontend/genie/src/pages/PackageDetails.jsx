import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdLocationOn, MdDateRange, MdAttachMoney } from 'react-icons/md';
import Sidebar from '../components/SideBar.jsx';
import PackageReviews from './PackageReviews.jsx';

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const navigate = useNavigate();

  console.log(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.error('Error fetching package:', err);
      }
    };
    fetchPackage();
  }, [id]);

  if (!pkg) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading package details...
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />
      <Sidebar />

      <div className="ml-64 p-10 w-full relative z-10 text-white">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
          <img
            src={pkg.photo || '/default-image.jpg'}
            alt={pkg.packageName}
            className="w-full h-72 object-cover"
          />
          <div className="p-6 text-gray-800">
            <h1 className="text-3xl font-bold text-pink-600 mb-2">{pkg.packageName}</h1>
            <p className="text-gray-700 mb-4">{pkg.packageDescription}</p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <p className="flex items-center gap-2">
                <MdLocationOn className="text-pink-600 text-xl" />
                <strong>Destination:</strong> {pkg.destination}
              </p>
              <p className="flex items-center gap-2">
                <MdDateRange className="text-pink-600 text-xl" />
                <strong>Duration:</strong> {pkg.duration}
              </p>
              <p className="flex items-center gap-2">
                <MdDateRange className="text-pink-600 text-xl" />
                <strong>Start Date:</strong> {new Date(pkg.startDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <MdDateRange className="text-pink-600 text-xl" />
                <strong>End Date:</strong> {new Date(pkg.endDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <MdAttachMoney className="text-pink-600 text-xl" />
                <strong>Price per Person:</strong> Rs. {pkg.pricePerPerson.toFixed(2)}
              </p>
              <p className="flex items-center gap-2">
                <MdAttachMoney className="text-pink-600 text-xl" />
                <strong>Total Price:</strong> Rs. {pkg.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between mt-6 flex-wrap">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                ← Back
              </button>

              <button
                onClick={() => navigate(`/payment/${pkg._id}`)}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Proceed to Payment →
              </button>
            </div>

          </div>
        </div>

        <div className="mt-12">
          <PackageReviews packageId={pkg._id} userId={localStorage.getItem('userId')} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;