import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { UserContext } from '../../App';
import { highlight, languages } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-python'; // Import the Python language definition
import './codeEditor.css';
import { Menu } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/20/solid';

const CodeUpload = () => {
  const user = useContext(UserContext);

  const [robotStatus, setRobotStatus] = useState("Unknown");
  const [attachmentsStatus, setAttachmentsStatus] = useState({
    arm: "unknown",
    wheels: "connected",
    camera: "Disconnected",
  });

  const [robotsAvailable, setrobotsAvailable] = useState([
    'robot1',
    'robot2',
    'robot3',
    'robot3'
  ]);

  const [selectedRobot, setselectedRobot] = useState("Unknown");
  const [code, setCode] = useState("#type your code here");

  const getColorForValue = (value) => {
    switch (value.toLowerCase()) {
      case 'unknown':
        return 'gray';
      case 'disconnected':
        return 'red';
      case 'connected':
        return 'green';
      default:
        return 'black'; // Default color if none of the above match
    }
  };

  const handleRobotSelection = (robot) => {
    setselectedRobot(robot);
  };

  const UploadStatus = ({ message, success }) => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulating a 2-second loading time (adjust as needed)
  
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <div className="inline-flex items-center m-1.5">
        {loading ? (
          <span className="w-5 h-5 me-2 text-sm font-semibold bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" className="spinner_aj0A"/>
            </svg>
          </span>
        ) : (
          <span className={`w-5 h-5 me-2 text-sm font-semibold rounded-full flex-shrink-0 ${success ? 'bg-lime-200' : 'bg-red-200'}`}>
            {success ? (
              <CheckIcon className="w-5 h-auto text-lime-800" />
            ) : (
              <XMarkIcon className="w-5 h-auto text-red-800" />
            )}
          </span>
        )}
        <p className="inline-block">{message}</p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-primary/90 mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3">
        <div className="w-full grid grid-cols-4 gap-5 p-5">
          <div className="bg-ternary text-mainText rounded-md col-span-1 flex flex-col p-4 font-sans">
            <div>
              <h1 className="font-light text-4xl font-sans mb-12">Upload Your Code</h1>
              <Menu as="div" className="relative inline-block text-left bg-black rounded-md mb-5">
                <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  Select a Robot 🤖
                </Menu.Button>
                <Menu.Items className="absolute z-10 bg-black rounded-md mt-1 w-full">
                  {robotsAvailable.map((robot) => (
                    <Menu.Item key={robot} className="">
                      {({ active }) => (
                        <a
                          href={'#'}
                          onClick={() => { handleRobotSelection(robot); }}
                          className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {robot}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              <div className="text-sm font-normal">
                <h5 className="text-2xl mb-4">Status :</h5>
                <b>Robot : <font className="text-mainText" > {selectedRobot}</font></b>
                <br />
                Health : <font style={{ color: getColorForValue(robotStatus) }} > {robotStatus}</font>
                <p className="mt-2">Attachments :</p>
                <div className="bg-primary/70 m-1 p-2 rounded-md">
                  {Object.entries(attachmentsStatus).map(([key, value], index) => (
                    <p key={index}> {key}: <font style={{ color: getColorForValue(value) }}>{value}</font></p>
                  ))}
                </div>
              </div>
              <div className="bg-primary/50 border-4 border-mainText/30 border-dashed  rounded-lg p-2 py-3 my-5 ">
                <button type="button" className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg w-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload</button>
                <div className="bg-primary/90 rounded-lg p-3 my-3 text-sm font-sans">
                  <UploadStatus message="Uploaded to server" success={true} />
                  <UploadStatus message="Uploaded to bot" success={false} />
                </div>

              </div>
              <div className="text-center">
                <button type="button" className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900">Go to Live Feed</button>
              </div>
            </div>
          </div>
          <div className="bg-ternary rounded-xl text-mainText col-span-3">
            <style>
              {`
                input:focus, textarea:focus, select:focus {
                  outline: none;
                }
              `}
            </style>
            <div className="bg-primary rounded-xl flex-1 m-4 p-4 overflow-auto" style={{ maxHeight: "90vh" }}>
              <Editor
                value={code}
                onValueChange={_code => setCode(_code)}
                highlight={(code) => highlight(code, languages.python, 'python')}
                padding={10}
                style={{
                  fontFamily: 'monospace',
                  fontSize: 16,
                  minHeight: '80vh',
                }}
              />
            </div>
            <div className="text-right m-4 mt-20">
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Finish Experiment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeUpload;
