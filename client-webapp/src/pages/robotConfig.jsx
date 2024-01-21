import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "../components/dndContainer";
import Component from "../components/dndComponent";
import { Menu } from "@headlessui/react";
import axios from "../api/axios";

import camera from "../assets/attachments/camera.svg";
import hand from "../assets/attachments/hand.svg";
import wheel from "../assets/attachments/wheel.svg";
import { useNavigate } from "react-router-dom";

const ContainersList = [
  { id: "TF", name: "Top Front" },
  { id: "TR", name: "Top Right" },
  { id: "TL", name: "Top Left" },
  { id: "TB", name: "Top Back" },
  { id: "BF", name: "Bottom Front" },
  { id: "BR", name: "Bottom Right" },
  { id: "BL", name: "Bottom Left" },
  { id: "BB", name: "Bottom Back" },
];

const ComponentsList = [
  { id: "C1", name: "Camera", image: camera },
  { id: "C2", name: "Hand", image: hand },
  { id: "C3", name: "Wheel", image: wheel },
  { id: "C4", name: "Wheel", image: wheel },
  { id: "C5", name: "Wheel", image: wheel },
];

const RobotConfig = () => {
  //get user id
  const user = JSON.parse(localStorage.getItem("user"));
  //get robot id
  const [selectedRobotId, setSelectedRobotId] = useState(null);
  const [containers, setContainers] = useState({});
  const [order, setOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modularRobots, setModularRobots] = useState([
    { id: 1, name: "Modular Robot 1" },
    { id: 2, name: "Modular Robot 2" },
    { id: 3, name: "Modular Robot 3" },
  ]);

  const handleDrop = (containerId, componentId) => {
    const updatedContainers = { ...containers, [containerId]: componentId };
    setContainers(updatedContainers);
  };

  const handleRemove = (containerId) => {
    const updatedContainers = { ...containers, [containerId]: null };
    setContainers(updatedContainers);
  };

  const navigate = useNavigate();

  const handleSend = async () => {
    const orderedComponents = ContainersList.map((container) => {
      const componentId = containers[container.id];
      const componentName =
        ComponentsList.find((comp) => comp.id === componentId)?.name || "None";
      return componentName;
    });
    setOrder(orderedComponents);

    const date = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = date.toLocaleString("en-US", options);

    const experimentDetails = {
      user_id: user.id,
      //default selected robot is robot 1,
      robot_id: parseInt(selectedRobotId) || 1,
      attachments: orderedComponents,
      name: formattedDate,
    };

    try {
      await axios.post("/api/experiment", experimentDetails);
      //use a dialog box
      //console.log(res.data);

      navigate("/dashboard");
    } catch (error) {
      //console.error("Error:", error.response.data);
      //add dialog box
      console.log("Error:", error);
    }
  };

  const filteredComponents = ComponentsList.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-primary/90 mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3">
      <div className="w-full grid grid-cols-4 text-mainText ">
        <DndProvider backend={HTML5Backend}>
          <div className="bg-ternary rounded-md col-span-1 flex flex-col p-4 font-sans m-2 w-64 items-center ">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative flex items-center  bg-primary rounded-md  text-sm text-mainText mb-2">
                <svg
                  className="feather feather-search m-2"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>

                <input
                  type="search"
                  id="default-search"
                  className="block bg-primary w-full p-3 hover:outline-none rounded-md focus:outline-none"
                  placeholder="Search Component"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="overflow-y-scroll max-h-screen">
              {filteredComponents.map((component) => (
                <Component key={component.id} {...component} />
              ))}
            </div>
          </div>

          <div className="bg-ternary rounded-md col-span-3 flex flex-col p-4 font-sans m-2">
            <h1 className="font-light text-4xl font-sans mb-4">
              Configure Your Robot
            </h1>
            <form>
              <div className="relative flex items-center  bg-primary rounded-md  text-sm text-mainText mb-2">
                <label
                  htmlFor="robot-select"
                  className="p-4 mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>

                <select
                  id="robot-select"
                  className="block bg-primary w-full p-3 hover:outline-none rounded-md focus:outline-none"
                  onChange={(e) => setSelectedRobotId(e.target.value)}
                  value={selectedRobotId || ""}
                >
                  <option value="" disabled>
                    Select a robot
                  </option>
                  {modularRobots.map((robot) => (
                    <option key={robot.id} value={robot.id}>
                      {robot.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <div className="grid grid-cols-4">
              {ContainersList.map((container) => (
                <Container
                  key={container.id}
                  id={container.id}
                  name={container.name}
                  component={ComponentsList.find(
                    (comp) => comp.id === containers[container.id]
                  )}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <div className="text-right mt-10">
              <button
                type="button"
                className="w-40 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleSend}
              >
                Send Setup
              </button>
            </div>
          </div>
        </DndProvider>
      </div>
    </div>
  );
};
export default RobotConfig;
