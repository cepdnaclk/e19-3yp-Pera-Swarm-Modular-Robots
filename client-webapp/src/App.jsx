import { useState } from "react";
import "./App.css";
import LoginForm from "../src/pages/login";
import Header from "./components/header";
import Sandbox from "../src/pages/sandbox";
import RobotConfig from "../src/pages/robotConfig";
import AdminDashboard from "../src/pages/adminDashboard";

function App() {
  return (
    //<div><LoginForm/></div>
    <div>
      <RobotConfig />
    </div>
  );
}

export default App;
