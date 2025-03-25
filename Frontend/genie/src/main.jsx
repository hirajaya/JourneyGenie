import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import UserDetails from './pages/UserDetails.jsx'
import Itineraries from './pages/Admin/Itineraries.jsx'
import Reviews from './pages/Admin/Reviews.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import CreatePackage from './pages/Admin/CreatePackage.jsx'
import PackageDetails from './pages/PackageDetails.jsx'
import './index.css'
import Register from './pages/Register.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chatbot from './components/Chatbot.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />

      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/reviews" element={<Reviews />} />
      <Route path="/admin/itineraries" element={<Itineraries />} />
      <Route path="/admin/create-package" element={<CreatePackage />} />

      <Route path="/user/:username" element={<UserDetails />} />
      <Route path="/packages/:id" element={<PackageDetails />} />
      <Route path="/chatbot" element={<Chatbot/>} />

    </Routes>
  </Router>
);

