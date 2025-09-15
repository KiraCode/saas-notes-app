import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider, { useAuth } from "./context/authContext";
import Register from "./components/Register";
import NotesPage from "./components/NotesPage";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

function ProtectedDashboard() {
  const isAuthenticated = localStorage.getItem("token");
  const { user } = useAuth();

  if (!isAuthenticated && !user) {
    console.log(!isAuthenticated, "login");
    return <Navigate to="/login" />;
  }

  if (user.role === "ADMIN") {
    console.log("admin");
    return <Dashboard />;
  }
  if (user.role === "MEMBER") {
    console.log("member");
    return <NotesPage />;
  }

  return <Navigate to="/login" />;
}
