import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import LoginForm from "../src/pages/login";
import RobotConfig from "../src/pages/robotConfig";
import Sandbox from "../src/pages/sandbox";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import CodeUpload from "../src/pages/codeUpload";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/robotConfig" element={<RobotConfig />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/codeUpload" element={<CodeUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;