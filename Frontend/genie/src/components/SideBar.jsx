import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle, FaRobot, FaHome, FaThumbtack } from 'react-icons/fa';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const username = localStorage.getItem('loggedInUser');

  const isExpanded = isHovered || isPinned;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-screen bg-black p-4 shadow-lg fixed left-0 top-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Top Section */}
      <div className="relative">
        {/* Pin Button */}
        <button
          onClick={() => setIsPinned(!isPinned)}
          className="absolute top-0 right-0 text-white text-sm hover:text-pink-500 transition"
          title={isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
        >
          <FaThumbtack className={`transform ${isPinned ? 'rotate-45' : ''}`} />
        </button>

        <div className="flex flex-col items-center space-y-6 mt-6">
          <FaUserCircle className="text-4xl text-white" />

          {isExpanded && (
            <>
              <h2 className="text-xl font-bold text-white">Welcome Back !</h2>
              <ul className="space-y-4 w-full text-center">
                <li>
                  <Link
                    to="/home"
                    className="inline-flex items-center justify-center gap-2 bg-white text-pink-700 font-semibold rounded-full px-4 py-2 shadow-md hover:bg-pink-200 transition"
                  >
                    <FaHome />
                    <span className="ml-1">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chatbot"
                    className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white font-semibold rounded-full px-4 py-2 hover:bg-pink-700 transition shadow"
                  >
                    <FaRobot />
                    <span className="ml-1">Ask Genie</span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="text-xs text-gray-400 text-center px-2 mt-6 space-y-3">
          <div>
            <Link
              to={`/user/${username}`}
              className="inline-block bg-white text-pink-700 font-semibold rounded-full px-6 py-3 text-sm shadow-md hover:bg-pink-200 transition"
            >
              {username}
            </Link>
          </div>

          <p className="leading-5">
            <span className="font-semibold text-white">Journey Genie</span> is your smart travel
            companion — find, plan, and experience memorable trips across Sri Lanka.
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
