import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

const Itineraries = () => {
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/packages');
      setPackages(res.data);
    } catch (err) {
      toast.error('Failed to fetch packages');
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`);
      toast.success('Package deleted successfully');
      fetchPackages();
    } catch (err) {
      toast.error('Failed to delete package');
    }
  };

  const handleEditClick = (pkg) => {
    setEditingPackage(pkg);
    setFormData({ ...pkg });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/packages/${editingPackage._id}`, formData);
      toast.success('Package updated successfully');
      setEditingPackage(null);
      fetchPackages();
    } catch (err) {
      toast.error('Failed to update package');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex"
      style={{ backgroundImage: "url('/bgImage.jpg')" }}
    >
      <ToastContainer position="top-right" />
      <AdminNavbar />

      <div className="flex-1 relative p-8 z-10">
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />

        <div className="relative bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-7xl mx-auto z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-black">Tour Itineraries</h1>
            <button
              onClick={() => navigate('/admin/create-package')}
              className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              <FaPlus /> Create Package
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-pink-600 text-white text-sm font-semibold">
                <tr>
                  <th className="py-3 px-4 rounded-tl-lg">Package Name</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Price/Person</th>
                  <th className="py-3 px-4">Total Price</th>
                  <th className="py-3 px-4 rounded-tr-lg"></th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {packages.map((pkg, idx) => (
                  <tr
                    key={pkg._id}
                    className="even:bg-gray-50 hover:bg-pink-50 transition duration-200"
                  >
                    <td className="py-3 px-4">{pkg.packageName}</td>
                    <td className="py-3 px-4">{pkg.destination}</td>
                    <td className="py-3 px-4">{pkg.duration}</td>
                    <td className="py-3 px-4">{new Date(pkg.startDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(pkg.endDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">Rs. {pkg.pricePerPerson.toFixed(2)}</td>
                    <td className="py-3 px-4">Rs. {pkg.totalPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      <button
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                        title="Edit"
                        onClick={() => handleEditClick(pkg)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                        title="Delete"
                        onClick={() => deletePackage(pkg._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-gray-500 py-6">
                      No packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {editingPackage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center text-pink-600">Update Package</h2>
                <form onSubmit={handleUpdateSubmit} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="packageName"
                    placeholder="Package Name"
                    value={formData.packageName}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate?.substring(0, 10)}
                    min={new Date().toISOString().split('T')[0]} 
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate?.substring(0, 10)}
                    min={formData.startDate?.substring(0, 10) || new Date().toISOString().split('T')[0]} 
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />

                  <input
                    type="number"
                    name="pricePerPerson"
                    placeholder="Price Per Person"
                    value={formData.pricePerPerson}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="numberOfPersons"
                    placeholder="No. of Persons"
                    value={formData.numberOfPersons}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    value={formData.photo}
                    onChange={handleInputChange}
                    className="col-span-2 border p-2 rounded"
                  />
                  <div className="col-span-2 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingPackage(null)}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Itineraries;
