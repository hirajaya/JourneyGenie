import { NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `py-2 px-4 rounded-lg transition-all ${
      isActive
        ? 'bg-white text-pink-700 font-semibold shadow'
        : 'hover:bg-pink-600 hover:text-white'
    }`;

  return (
    <nav className="bg-white text-black w-64 min-h-screen p-6 flex flex-col gap-10 shadow-2xl">
      <div className="text-2xl font-bold tracking-wider text-center border-b border-pink-400 pb-4">
        Admin Panel
      </div>

      <ul className="flex flex-col gap-4 text-base">
        <NavLink to="/admin/itineraries" className={linkClass}>
          Itineraries
        </NavLink>
        <NavLink to="/admin/reviews" className={linkClass}>
          Reviews
        </NavLink>
        <NavLink to="/admin-dashboard" className={linkClass}>
          Users
        </NavLink>
      </ul>

      <div className="mt-auto flex flex-col gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
        >
          Log Out
        </button>
        <div className="text-center text-sm text-pink-700">
          &copy; 2025 JourneyGenie
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
