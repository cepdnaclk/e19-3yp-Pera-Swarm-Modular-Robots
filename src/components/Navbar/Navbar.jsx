// import { useEffect } from "react"
// import "./Navbar.css";
// import useOnScreen from "hooks/useOnScreen";

// function Navbar({refs}){
//   const links = ["Home", "About", "Contact"];
//   const isOnScreen = refs.map((ref)=>useOnScreen(ref));

//   // scroll to page on nav item click
//   const handleClick = (ref) => {
//     ref.current?.scrollIntoView({ behaviour:'smooth'  })
//   }

//   useEffect(()=>{
//     console.log(isOnScreen);
//   }, [isOnScreen])

//   return(
//     <nav>
//       <ul>
//         {
//           links.map((link, index)=>(
//             <li
//               className={isOnScreen[index] ? "active" : null}
//               key={index}
//               onClick={()=>{handleClick(refs[index])}}
//             >
//               {link}
//             </li>
//           ))
//         }
//       </ul>
//     </nav>
//   );
// }

// Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "assets/logo.svg";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-card">
      <nav className="navbar">
        <div className="navbar-title">
          <img src={logo} /> Pera Swarm Modular Robots
        </div>
        <div className="navbar-links">
          <NavLink
            className="navbar-link"
            to="/"
            exact="true"
            activeclassname="active-link"
          >
            Home
          </NavLink>
          <NavLink
            className="navbar-link"
            to="/docs"
            activeclassname="active-link"
          >
            Docs
          </NavLink>
          <NavLink
            className="navbar-link"
            to="/design"
            activeclassname="active-link"
          >
            Design
          </NavLink>
          <NavLink
            className="navbar-link"
            to="/about"
            activeclassname="active-link"
          >
            About Us
          </NavLink>
        </div>
        <button className="navbar-button">Go to Web App</button>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
