import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

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
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // 1. Minimum timer so the satisfying logo fill animation is actually seen
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
    // 2. Load core global identity and wait for the network to resolve auth state
    const authResolve = new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        resolve();
        unsubscribe(); // Once we know identity, resolve the bootloader
      });
    });

    // Remove the Loading Screen only when BOTH the animation is done and the data is loaded
    Promise.all([minLoadTime, authResolve]).then(() => {
      setInitialLoading(false);
    });
  }, []);

  // Hide WhatsApp and Navbar/Footer if we are on the Admin Dashboard for a cleaner "Control Panel" feel
  const isAdminPage = 
    location.pathname.startsWith("/ds-8u92ne3x9l7o45-secure") || 
    location.pathname.startsWith("/admin-unexlogistics");

  if (initialLoading) {
    return <LoadingScreen />;
  }

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
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin-unexlogistics" element={<AdminLogin />} />
        <Route
          path="/ds-8u92ne3x9l7o45-secure"
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