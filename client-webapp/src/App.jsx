import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../src/pages/login";
import RobotConfig from "../src/pages/robotConfig";
import Sandbox from "../src/pages/sandbox";
import AdminDashboard from "../src/pages/adminDashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/robotConfig" element={<RobotConfig />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

///////////////////////
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import DragDrop from "../src/components/dragdrop";

// function App() {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="App">
//         <DragDrop />
//       </div>
//     </DndProvider>
//   );
// }

// export default App;
//////////////////////
