import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">UserManager</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-indigo-500">Dashboard</Link>
                <Link to="/profile" className="px-3 py-2 rounded hover:bg-indigo-500">Profile</Link>
                {currentUser.isAdmin && (
                  <Link to="/users" className="px-3 py-2 rounded hover:bg-indigo-500">User List</Link>
                )}
                <button onClick={handleLogout} className="px-3 py-2 rounded hover:bg-indigo-500">Logout</button>
                <span className="px-3 py-2 font-medium">Hello, {currentUser.name}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded hover:bg-indigo-500">Login</Link>
                <Link to="/register" className="px-3 py-2 rounded bg-white text-indigo-600 hover:bg-gray-100">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 pb-3 px-4">
          {currentUser ? (
            <div className="space-y-1">
              <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-indigo-500">Dashboard</Link>
              <Link to="/profile" className="block px-3 py-2 rounded hover:bg-indigo-500">Profile</Link>
              {currentUser.isAdmin && (
                <Link to="/users" className="block px-3 py-2 rounded hover:bg-indigo-500">User List</Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded hover:bg-indigo-500">Logout</button>
              <span className="block px-3 py-2 font-medium">Hello, {currentUser.name}</span>
            </div>
          ) : (
            <div className="space-y-1">
              <Link to="/login" className="block px-3 py-2 rounded hover:bg-indigo-500">Login</Link>
              <Link to="/register" className="block px-3 py-2 rounded bg-white text-indigo-600 hover:bg-gray-100">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;