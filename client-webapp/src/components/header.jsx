import { useEffect, useState, Fragment, useRef, useContext } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Switch, Menu, Transition } from '@headlessui/react'
import { UserContext } from '../App';
import {ErrorDialog} from '../components/dialogBox';

import lightLogo from '../assets/logo_light.svg';
import darkLogo from '../assets/logo_dark.svg';
import lightlogoFont from '../assets/logoFont_light.svg';
import darkLogoFont from '../assets/logoFont_dark.svg';

import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid'

export default function Header() {

  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for saved dark mode preference
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const [showLogout, setShowLogout] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);

    // Save the current dark mode preference to local storage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
  }, [darkMode]);
  
  const handleLogout = ()=>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    window.location.reload();
  };
  
  return (
    <div className={`backdrop-blur-md bg-primary/40 mx-auto my-2 shadow-lg rounded-2xl flex max-w-7xl items-center justify-between p-3 lg:px-8 aria-label="Global"`}>
      <div className="flex lg:flex-1 ">
        <img className="h-8 w-auto" src={darkMode ? darkLogoFont : lightlogoFont} alt="logo" />
      </div>

      <div className="flex  justify-self-center">
        <a href="#" className="-m-1.5 p-1.5">
          <img className="h-14 w-auto" src={darkMode ? darkLogo : lightLogo} alt="logo" />
        </a>
      </div>



      <div className="hidden lg:flex lg:flex-1 lg:justify-end">

        {user ?
          <div className="flex items-center gap-4 mx-8">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium  dark:text-gray-300">{user.name.slice(0,2)}</span>
            </div>

            <div className="font-medium text-mainText">
              <div>{user.name}</div>
              <div className="text-sm text-gray-500 ">{user.role}</div>
            </div>
          </div>
          : null}

        <div>


          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${darkMode ? 'bg-gray-200' : 'bg-gray-900'}
            relative inline-flex h-[20px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
          >
            <span
              aria-hidden="true"
              className={`${darkMode ? 'translate-x-4' : 'translate-x-0'}
              pointer-events-none inline-block h-[17px] w-[17px] transform  transition duration-200 ease-in-out`}
            > {darkMode ? <SunIcon className=" text-neutral-900" /> : <MoonIcon className=" text-yellow-200" />}</span>
          </Switch>

          {user ?
            <Menu as="div" >
              <div>
                <Menu.Button className="rounded-xl bg-teal-950/0 px-2 py-0  text-mainText hover:bg-amber-300 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">

                  <ChevronDoubleDownIcon
                    className="h-5 w-5  "
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-red-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}  
                          onClick={()=>setShowLogout(true)}
                          >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            : null}
        </div>

      </div>

      <ErrorDialog showState = {showLogout} closefn={setShowLogout}  buttonClickFunction={handleLogout} title="Logout" errMsg="Are you Sure ?" btnText="Yes"  />

    </div>
  );
}
