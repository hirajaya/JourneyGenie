import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar
import HomePage from "./pages/HomePage";
import PackageCreationForm from "./pages/PackageCreation";
import ManagePackages from "./pages/createdpackages"; 
import ViewPackages from "./pages/ViewPackages";

function App() {

  
  return (
    <>
      <Navbar /> {/* Display Navbar on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-package" element={<PackageCreationForm />} />
        <Route path="/manage-packages" element={<ManagePackages />} />
        <Route path="/view-packages" element={<ViewPackages />} />
      </Routes>
    </>
  );
}

export default App;
