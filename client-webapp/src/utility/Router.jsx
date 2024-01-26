import React, { useContext } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "../pages/login";
import NotFoundPage from "../pages/NotFound";
import RobotConfig from "../pages/robotConfig";
import Sandbox from "../pages/sandbox";
import UserDashboard from "../pages/userDashboard";
import AdminDashboard from "../pages/adminDashboard";
import CodeUpload from "../pages/codeUpload/codeUpload";
import LiveMonitoring from "../pages/liveMonitoring";

import { UserContext } from "../App";

const CustomRoutes = () => {

  const user = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
          <Route path="/" element={<LoginForm />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <Route path="/dashboard" element={<AdminDashboard />} />

            )}

            {user.role === 'experimenter' && (
              <>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/sandbox" element={<Sandbox />} />
                <Route path="/robotConfig/:exp_name/:exp_schedule" element={<RobotConfig />} />
                <Route path="/codeUpload/:exp_id" element={<CodeUpload />} />
                <Route path="/live/:exp_id" element={<LiveMonitoring />} />
              </>
            )}

            {/* Redirect to /dashboard for any unknown routes */}
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}

        {/* Fallback route for unmatched paths */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default CustomRoutes;
