// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ExperienceDetails from './pages/ExperienceDetails';
import Checkout from './pages/Checkout';
import BookingResult from './pages/BookingResult';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience/:id" element={<ExperienceDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-result" element={<BookingResult />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;