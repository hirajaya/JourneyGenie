import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from 'react-toastify';
import Background from './assets/Background.mp4';

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">

      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={Background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/70 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4">
          Discover Sri Lanka with <span className="text-pink-500">Journey Genie</span>
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl text-gray-200 mb-6">
          Your smart travel companion for curated experiences, scenic destinations, and unforgettable adventures.
        </p>
        <a
          href="/login"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
        >
          Explore Packages
        </a>
      </div>
    </div>
  );
}

export default App;
