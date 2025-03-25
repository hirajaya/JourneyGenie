import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar.jsx';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex"
      style={{ backgroundImage: "url('/bgImage.jpg')" }}
    >
      <AdminNavbar />

      <div className="flex-1 relative p-8 z-10">
        
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />

        <div className="relative bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-6xl mx-auto z-10">
          <h1 className="text-3xl font-extrabold text-center text-black mb-8">
            Our Users
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse text-center">
              <thead>
                <tr className="bg-pink-700 text-white rounded-lg">
                  <th className="px-4 py-3 rounded-tl-lg">Username</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 rounded-tr-lg">Province</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`${
                      idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    } hover:bg-pink-50 transition`}
                  >
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.province}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
