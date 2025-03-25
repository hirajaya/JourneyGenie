import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaUserCircle, FaRobot, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const username = localStorage.getItem('loggedInUser');

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen bg-black p-4 shadow-lg fixed left-0 top-0 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
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
                </Link>
              </li>
              <li>
                <Link
                  to="/chatbot"
                  className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white rounded-full px-4 py-2 hover:bg-pink-700 transition shadow"
                >
                  <FaRobot /> 
                </Link>
              </li>
              <li>
                <Link
                  to={`/user/${username}`}
                  className="inline-block bg-white text-pink-700 font-semibold rounded-full px-4 py-2 shadow-md hover:bg-pink-200 transition"
                >
                  {username}
                </Link>
              </li>
              
            </ul>
          </>
        )}
      </div>

      {isExpanded && (
        <div className="text-xs text-gray-400 text-center px-2 mt-6">
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
