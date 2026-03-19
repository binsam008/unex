import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Track from "./pages/Track";
import Documents from "./pages/Documents";
import ProhibitedItems from "./pages/ProhibittedItems";
import Quote from "./pages/Quote";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import WhatsAppIcon from "./components/WhatsAppIcon"; // Import the new component

function App() {
  const location = useLocation();
  
  // Hide WhatsApp and Navbar/Footer if we are on the Admin Dashboard for a cleaner "Control Panel" feel
  const isAdminPage = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/track" element={<Track />} />

        {/* Support Routes */}
        <Route path="/support/documents" element={<Documents />} />
        <Route path="/support/prohibited-items" element={<ProhibitedItems />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/contact" element={<Contact/>} />

        {/* Admin */}
        <Route path="/admin-unexlogistics" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPage && <Footer />}
      
      {/* Floating WhatsApp stays on all public pages */}
      {!isAdminPage && <WhatsAppIcon />}
    </>
  );
}

export default App;