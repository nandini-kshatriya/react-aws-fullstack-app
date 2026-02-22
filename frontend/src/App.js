import React from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import VerifyAccount from "./components/Auth/VerifyAccount";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<VerifyAccount />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;