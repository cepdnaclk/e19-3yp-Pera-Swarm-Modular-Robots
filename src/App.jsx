import { useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import "./App.css";

import Navbar from "components/Navbar";
import Home from "pages/Home";
import About from "pages/About";
import Contact from "pages/Contact";

function App() {

  const pages = [Home, About, Contact];
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const refs = [homeRef, aboutRef, contactRef];

  return (
  <>
    <Navbar refs={refs}/>
    <div className="fullpage-container">
    {  
      pages.map((Page, index)=>(
      <div
        className="fullpage" 
        key={index}
        ref={refs[index]}
      >
        <Page />
      </div>
      ))
    }
    </div>
  </>
  )
}

export default App
