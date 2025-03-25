import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../../components/AdminNavbar';

const CreatePackage = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    packageDescription: '',
    destination: '',
    duration: '',
    startDate: '',
    endDate: '',
    pricePerPerson: '',
    numberOfPersons: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (start < today) {
      toast.error('Start date cannot be in the past.');
      return;
    }

    if (end < start) {
      toast.error('End date cannot be before start date.');
      return;
    }

    const totalPrice = parseFloat(formData.pricePerPerson) * parseInt(formData.numberOfPersons);

    try {
      await axios.post('http://localhost:5000/api/packages', {
        ...formData,
        totalPrice,
      });
      toast.success('Package created successfully!');
      setFormData({
        packageName: '',
        packageDescription: '',
        destination: '',
        duration: '',
        startDate: '',
        endDate: '',
        pricePerPerson: '',
        numberOfPersons: '',
        photo: '',
      });
    } catch (err) {
      toast.error('Failed to create package');
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bgImage.jpg')" }}
    >
      <ToastContainer position="top-right" />
      <AdminNavbar />

      <div className="flex-1 relative p-8 z-10">
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />

        <div className="relative bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-4xl mx-auto z-10">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
            Create New Tour Package
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <input type="text" name="packageName" placeholder="Package Name" value={formData.packageName} onChange={handleChange} required className="border p-2 rounded" />
            <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required className="border p-2 rounded" />

            <input type="text" name="duration" placeholder="Duration (e.g., 5 Days / 4 Nights)" value={formData.duration} onChange={handleChange} required className="border p-2 rounded" />
            <input type="text" name="packageDescription" placeholder="Description" value={formData.packageDescription} onChange={handleChange} required className="border p-2 rounded" />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              min={todayStr}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              min={formData.startDate || todayStr}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />

            <input type="number" name="pricePerPerson" placeholder="Price per Person" value={formData.pricePerPerson} onChange={handleChange} required className="border p-2 rounded" />
            <input type="number" name="numberOfPersons" placeholder="Number of Persons" value={formData.numberOfPersons} onChange={handleChange} required className="border p-2 rounded" />

            <input type="text" name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} className="col-span-2 border p-2 rounded" />

            <div className="col-span-2 flex justify-end">
              <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded">
                Create Package
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePackage;
