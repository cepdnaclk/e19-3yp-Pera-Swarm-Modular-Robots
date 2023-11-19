import { useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import "./App.css";

//import Navbar from "components/Navbar";

import Home from "pages/Home";
import About from "pages/About";
import Contact from "pages/Contact";
import Overview from './components/Overview/Overview';

function App() {

  // const pages = [Home, About, Contact];
  // const homeRef = useRef(null);
  // const aboutRef = useRef(null);
  // const contactRef = useRef(null);
  // const refs = [homeRef, aboutRef, contactRef];

  return (
  <>
    <Overview/>
   
  </>
  )
}

export default App
