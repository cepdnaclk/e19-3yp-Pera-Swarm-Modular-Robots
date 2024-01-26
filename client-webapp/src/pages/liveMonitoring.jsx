import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { UserContext } from "../App";
import GaugeComponent from "react-gauge-component";


import LiveChart from "../components/livechart";

const LiveMonitoring = () => {
  const user = useContext(UserContext);
  const [consoleText, setConsoleText] = useState(">>> starting experiment");
  const armAngle = 45;

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

  return (
    <div className="bg-primary/90 mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3 text-mainText">
      <div className="grid grid-cols-2 grid-rows-2 gap-5 p-5 w-full">
        <div className="bg-ternary min-h-28 rounded-lg">test</div>
        <div className="bg-ternary min-h-28 rounded-lg font-mono p-5 overscroll-contain">
          {consoleText}
        </div>
        <div className="bg-ternary min-h-28 rounded-lg p-3 font-sans text-mainText">
          <div className="text-text font-thin flex items-center justify-center text-3xl mb-10">
            Arm position
          </div>
          {/* <div className="flex items-center justify-between mt-[60px] px-[60px] z-10">
            <span>Left</span>
            <span>Right</span>
          </div> */}
          <GaugeComponent
            value={armAngle}
            minValue={-90}
            maxValue={90}
            type="radial"
            className="font-semibold "

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
        <div className="bg-ternary rounded-lg p-3">
          {/* <LiveChart /> */}
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
