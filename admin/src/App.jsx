import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadProduct from "./pages/UploadProduct";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Inbox from "./pages/Inbox";
import EnquiryDetail from "./pages/EnquiryDetail";

function AppWrapper() {
  const { token } = useAuth();

  const showNavbar = token;
  const mainPadding = showNavbar ? "pt-16" : "";

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={mainPadding}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries/:id"
            element={
              <ProtectedRoute>
                <EnquiryDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;