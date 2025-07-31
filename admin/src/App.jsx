import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadProduct from "./pages/UploadProduct";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <Router>
      {token && <Navbar />}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}
          />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadProduct />
            </ProtectedRoute>}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
