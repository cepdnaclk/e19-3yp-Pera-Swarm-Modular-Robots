import React, { useState, useEffect, useContext } from "react";
//import Modal from "react-modal";
import axios from "../api/axios";
import { UserContext } from "../App";
import { Menu } from "@headlessui/react";

import GaugeComponent from "react-gauge-component";
import LiveChart from "../components/livechart";

const LiveMonitoring = () => {
  const user = useContext(UserContext);

  const [consoleText, setConsoleText] = useState(">>> starting experiment");

  //display the success dialog box when upload the code
  // const [isUploadSuccessModalOpen, setIsUploadSuccessModalOpen] =
  //   useState(false);

  // const [isUploadFailedModalOpen, setIsUploadFailedModalOpen] = useState(false);

  // Use React Router's useLocation to get query parameters

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/api/status");
  //     const data = await response.json();

  //     // Update state of the robots and attachments based on the received data
  //     setRobotStatus(data.robotStatus);
  //     setAttachmentsStatus(data.attachmentsStatus);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch data initially
  //   fetchData();

  //   // Set up interval for get updates every minute
  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 60000);

  //   // Clear interval on component unmount to avoid memory leaks
  //   return () => clearInterval(intervalId);
  // }, []);

  //submitting code
  // const handleCodeSubmit = async () => {
  //   // Check if id is null before making the request
  //   if (userId === null) {
  //     console.error("Invalid id:", userId);
  //     return;
  //   }

  //   const apiUrl = `api/experiment/${userId}/code`;
  //   //console.log("Api Url:", apiUrl);

  //   const encodedCode = (code);
  //   const value = { code: encodedCode, requirements: "" };
  //   console.log("req:", value);
  //   try {
  //     const response = await axios.post(apiUrl, value);

  //     console.log("Response:", response);

  //     if (response.status === 201 ) {
  //       console.log("Code submitted successfully");
  //       setIsUploadSuccessModalOpen(true);
  //     } else {
  //       console.error("Failed to submit code");
  //       setIsUploadFailedModalOpen(true);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting code:", error);
  //   }
  // };

  // const closeUploadSuccessModal = () => {
  //   setIsUploadSuccessModalOpen(false);
  // };

  // const closeUploadFailedModal = () => {
  //   setIsUploadFailedModalOpen(false);
  // };

  const getColorForValue = (value) => {
    switch (value.toLowerCase()) {
      case "unknown":
        return "gray";
      case "disconnected":
        return "red";
      case "connected":
        return "green";
      default:
        return "black"; // Default color if none of the above match
    }
  };

  const armAngle = 1;

  return (
    <>
      <div className=" bg-primary/90  mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3  text-mainText">
        <div className="w-full grid grid-cols-2 grid-rows-2  gap-5 p-5">
          {/* live feed */}
          <div className="bg-ternary min-h-96 rounded-lg">test</div>
          {/* console */}
          <div className="bg-ternary min-h-96 rounded-lg font-mono p-5">
            <p>{consoleText}</p>
          </div>
          {/* meters */}
          <div className="bg-ternary min-h-96 rounded-lg p-3">
            <div className="text-text font-mono flex align-middle justify-center text-3xl mb-10">
              Arm position
            </div>
            {/* small meters 
            <div className="flex align-middle justify-between mt-5 px-10 pt-5">
              <span className="ml-[60px]">Left</span>
              <span className="z-10">
                <GaugeComponent
                  value={armAngle}
                  minValue={-90}
                  maxValue={90}
                  type="radial"
                  labels={{
                    valueLabel: {
                      matchColorWithArc: true,
                      formatTextValue: (value) => `${value}°`,
                    },
                    tickLabels: {
                      type: "inner",
                      ticks: [{ value: 0 }, { value: -45 }, { value: 45 }],
                      defaultTickValueConfig: {
                        formatTextValue: (value) => `${value}°`,
                        style: {
                          fontSize: "12px",
                          fill: "#f0fff0",
                        },
                      },
                    },
                  }}
                  arc={{
                    colorArray: ["#ff6347", "#ffd700"],
                    subArcs: [{ limit: 0 }, { limit: 90 }],
                    padding: 0.02,
                    width: 0.25,
                  }}
                  pointer={{
                    type: "needle",
                    elastic: true,
                    animationDelay: 0,
                    animationDuration: 1000,
                    color: "black",
                  }}
                />
              </span>{" "}
              <span className="mr-[60px]">Right</span>
            </div>*/}
            <div className="flex align-middle justify-between mt-[60px] px-[60px] z-10">
              Left <span className="">Right</span>
            </div>

            <GaugeComponent
              value={armAngle}
              minValue={-90}
              maxValue={90}
              type="radial"
              labels={{
                valueLabel: {
                  matchColorWithArc: true,
                  formatTextValue: (value) => `${value}°`,
                },
                tickLabels: {
                  type: "inner",
                  ticks: [{ value: 0 }, { value: -45 }, { value: 45 }],
                  defaultTickValueConfig: {
                    formatTextValue: (value) => `${value}°`,
                    style: {
                      fontSize: "18px",
                      fill: "#f0fff0",
                    },
                  },
                },
              }}
              arc={{
                colorArray: ["#ff6347", "#ffd700"],
                subArcs: [{ limit: 0 }, { limit: 90 }],
                padding: 0.02,
                width: 0.25,
              }}
              pointer={{
                type: "needle",
                elastic: true,
                animationDelay: 0,
                animationDuration: 1000,
                color: "black",
              }}
            />
          </div>

          {/* graph */}
          <div className="bg-ternary min-h-96 rounded-lg p-3">
            <LiveChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveMonitoring;
