import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar.jsx';
import axios from 'axios';

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    'Search Ella Adventures...',
    'Search Kandy Tours...',
    'Search Galle Beach Trips...',
    'Search Hill Country Escapes...',
    'Search Wildlife Safaris...',
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        setPackages(res.data);
      } catch (err) {
        console.error('Failed to fetch packages:', err.message);
      }
    };
    fetchPackages();
  }, []);

  // cycle placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />

      <Sidebar />

      <div className="ml-64 p-8 w-full relative z-10">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
          Explore Our Travel Packages
        </h1>

        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder={placeholders[placeholderIndex]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 text-sm rounded-full border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-pink-500 transition bg-white placeholder-gray-400"
          />
        </div>

        {filteredPackages.length === 0 ? (
          <p className="text-center text-gray-200">No matching packages found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg._id}
                onClick={() => navigate(`/packages/${pkg._id}`)}
                className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <img
                  src={pkg.photo || '/default-image.jpg'}
                  alt={pkg.packageName}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{pkg.packageName}</h2>
                  <p className="text-sm text-gray-600 truncate">{pkg.destination}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
