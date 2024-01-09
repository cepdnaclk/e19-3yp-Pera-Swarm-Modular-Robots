import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import user from "../assets/user.png";

const Header = () => {

  const userJSON = localStorage.getItem('user'); // fetching the user from localStorage
  const user = JSON.parse(userJSON); // fetching the username from localStorage
  const username = user.name; // fetching the username from localStorage

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(document.body.getAttribute("data-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "light") {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }

    setIsDarkTheme(!isDarkTheme);
  };

  // Get the first letter of the username
  const userInitial = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div className={`bg-container p-4 m-3 rounded-xl ${isDarkTheme ? 'dark:bg-dark-container' : ''}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo flex items-center">
          <img src={logo} alt="Logo" className="h-11 pr-3" />
          <div
            className={`toggle-button flex p-1 items-center rounded-full ${isDarkTheme ? 'bg-dark-container-accent text-dark-f-accent' : 'bg-container-accent text-f-accent'}`}
            onClick={toggleTheme}
          >
            <span className={`mr-2 ${isDarkTheme ? 'hidden' : 'block'} text-3xl`}>◐&ensp;</span>
            <span className={`ml-2 ${isDarkTheme ? 'block' : 'hidden'} text-3xl `}>&ensp;◐</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-2 flex items-center">
            {username && (
              <>
                <span className="text-f mr-2 ${isDarkTheme ? 'dark:text-dark-f' : ''}">&emsp;<b>Hi {username}!</b></span>
                <span className="text-f mr-2 text-3xl bg-primary w-[40px] h-[40px] rounded-full pl-[9px] dark:text-f-accent">{userInitial}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
