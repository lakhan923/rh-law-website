import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";

import Home from "./pages/Home/home";
import About from "./pages/About/about";
import PracticeAreas from "./pages/PracticeAreas/practiceAreas";
import Team from "./pages/Team/team";
import Contact from "./pages/Contact/contact";
import Book from "./pages/BookAppointment/book";
import PracticeDetail from "./pages/PracticeAreas/practiceDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy/privacyPolicy";
import Admin from "./pages/Admin/admin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice-areas" element={<PracticeAreas />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/practice/:slug" element={<PracticeDetail />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login-admin" element={<AdminLogin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
