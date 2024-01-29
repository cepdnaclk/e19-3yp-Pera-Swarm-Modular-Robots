import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import GaugeComponent from "react-gauge-component";
import ReactPlayer from "react-player";

import LiveChart from "../components/livechart";

import camNotAvailable from "../assets/liveFeedNotAvailable.png";

const LiveMonitoring = () => {
  const user = useContext(UserContext);
  const { exp_id } = useParams();

  const [consoleText, setConsoleText] = useState(">>> starting experiment <br/>");
  const [armAngle, setArmAngle] = useState(0);
  const [robotBattery, setRobotBattery] = useState(0);
  const [chartValues, setChartValues] = useState({xVal:0, yVal:0}); //TODO:: change livechart component to accept these variables
  const liveStreamUrl = "https://26fcd54367a603a2.p60.rt3.io/html/cam_pic_new.php?time=1706519630930&pDelay=50000";
  

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

  useEffect(() => {
    try {
      const eventSource = new EventSource(`${import.meta.env.VITE_API_SERVER}/api/live`);
  
      // Handle events from the server
      eventSource.onmessage = (event) => {
        // Update your component state with the received data
        let liveData = JSON.parse(event.data);
        // setArmAngle(liveData.armAngle);

        if (liveData.batteryLevel !== null) {
          setRobotBattery(liveData.batteryLevel);
        }
        
        if (liveData.consoleText !== null) {
          setConsoleText((prevConsoleText) => prevConsoleText + liveData.consoleText + "<br />");
        }
        
        // setRandomArmPosition();
        // generateRandomChartData();

        // setChartValues(() => ({
        //   xVal: parseFloat(liveData.distanceToObject.xVal),
        //   yVal: parseFloat(liveData.distanceToObject.yVal),
        // }));

      };


  
      // Handle connection closure
      eventSource.onclose = () => {
        // Reconnect or handle closure as needed
        console.log('Connection closed');
      };
  
      // Handle connection errors
      eventSource.onerror = (error) => {
        setConsoleText((prevConsoleText) => prevConsoleText + "Connection error: cannot connect to the backend" + "<br />");
      };
  
      return () => {
        // Close the event source when the component unmounts
        eventSource.close();
      };
    } catch (error) {
      console.error("Error:", error.message);
      setConsoleText((prevConsoleText) => prevConsoleText + "Error: " + error.message + "<br />");
    }
  }, []);

  
function setRandomArmPosition() {
  // TODO: Implement logic to get arm position
  const armPosition = Math.floor(Math.random() * (90 - (-90) + 1) + (-90));
  setArmAngle(armPosition);
}

const generateRandomChartData = () => {
  setChartValues((prevChartValues) => {
    const randomYVal = (Math.random() * 100).toFixed(3); // Generate a random positive yVal
    const currentXVal = prevChartValues.xVal + 1; // Increase the xVal by 1

    return {
      xVal: currentXVal,
      yVal: randomYVal,
    };
  });
};


  return (
    <div className="bg-primary/90 mx-auto my-5 shadow-lg rounded-2xl  max-w-7xl p-3 text-mainText">
      <div className="flex justify-between mx-5">
        <Link to={`/codeUpload/${exp_id}`}>
          <button
            type="button"
            // onClick={() => {}}
            className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:sky-red-900"
          >
            Back
          </button>
        </Link>
        {/* <button
          type="button"
          onClick={() => {}}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Finish Experiment
        </button> */}
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-5 p-5 w-full">
        <div className="bg-ternary max-h-96 rounded-lg p-2">

          {/* <ReactPlayer
            url={liveStreamUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            muted={true}
            config={{
              file: {
                forceAudio: true,
              },
            }}
          /> */}
          <img className="w-full h-full rounded-lg" 
          src={liveStreamUrl}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = camNotAvailable; // Replace with the path to your default image
            e.target.alt = "Default Image"; // Replace with your alt text
          }}
          loading="lazy"
          ></img>

        </div>
        <div className="bg-ternary max-h-96 rounded-lg font-mono p-2 overscroll-auto overflow-scroll scroll-smooth">
        <div className="bg-secondary/70 rounded-md p-2 code-editor-container" dangerouslySetInnerHTML={{ __html: consoleText }} />

        </div>
        <div className="bg-ternary/20 border-8 border-sky-200/50 max-h-96 rounded-lg p-1 font-sans text-mainText grid grid-rows-4">

          <div className=" font-thin flex items-center justify-center text-3xl">
            Real time status
          </div>

          <div className="grid grid-cols-2 gap-4 place-items-center">

            <div>
              <div className=" font-thin flex items-center justify-center text-xl mb-0">
                Arm position
              </div>


              <GaugeComponent
                className=" w-auto"
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
                        fill: "rgba(var(--text-color))",
                      },
                    },
                  },
                }}
                arc={{
                  colorArray: ["#ff6347", "#ffd700"],
                  subArcs: [{ limit: 0 }, { limit: 90 }],
                  // padding: 0.02,
                  // width: 0.25,
                }}
                pointer={{
                  type: "needle",
                  elastic: true,
                  animationDelay: 0,
                  animationDuration: 1000,
                  width: 10,
                }}
              />

              
            </div>
            <div>
              <div className="text-text font-thin flex justify-center text-xl mb-2">
                Battery level
              </div>

              <GaugeComponent
                arc={{
                  className: "w-full",
                  nbSubArcs: 150,
                  colorArray: [ '#F5CD19', '#EA4228', '#5BE12C'],
                  width: 0.3,
                  padding: 0.003
                }}
                labels={{
                  valueLabel: {
                    fontSize: 40,
                    style: {
                      fill: 'rgba(var(--text-color))',
                      textShadow: ""
                    },
                    formatTextValue: value => `${value} %`
                  },
                  tickLabels: {
                    type: "outer",
                    ticks: [
                      { value: 10 },
                      { value: 20 },
                      { value: 30 },
                      { value: 40 },
                      { value: 50 },
                      { value: 60 },
                      { value: 70 },
                      { value: 80 },
                      { value: 90 },
                      { value: 100 },
                    ],
                    valueConfig: {
                      formatTextValue: value => `${value} %`,
                    }
                  }
                }}
                value={robotBattery}
                maxValue={100}
              />


            </div>
          </div>

        </div>
        <div className="bg-ternary rounded-lg p-3">

          <LiveChart values={chartValues} />

        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
