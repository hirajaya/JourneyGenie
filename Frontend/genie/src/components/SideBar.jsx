import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const username = localStorage.getItem('loggedInUser');

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen bg-black p-4 shadow-lg fixed left-0 top-0 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        <FaUserCircle className="text-4xl text-white" />

        {isExpanded && (
          <>
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <ul className="space-y-4 w-full text-center">
              <li>
                <Link
                  to={`/user/${username}`}
                  className="inline-block bg-white text-pink-700 font-semibold rounded-full px-4 py-2 shadow-md hover:bg-pink-200 transition"
                >
                  {username}
                </Link>
              </li>
              {}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
