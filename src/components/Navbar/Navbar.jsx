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

import React from 'react';
import './Navbar.css';
import logo from 'assets/logo.svg';

const Navbar = () => {
  return (
    <div className='navbar-card'>
    <nav className="navbar">
  
      <div className="navbar-title"><img src={logo}/> Swarm Modular Robot</div>
      <div className="navbar-links">
        <a href="#" className="navbar-link">Home</a>
        <a href="#" className="navbar-link">Design</a>
        <a href="#" className="navbar-link">Docs</a>
        <a href="#" className="navbar-link">About Us</a>
      </div>
      <button className="navbar-button">Downlod App</button>
    </nav>
    </div>
    
  );
};



export default Navbar;

