import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Button, Img, Text } from "../components";
import search from "../assets/search.png";
import modular_bot from "../assets/robot.png";
import obs_bot from "../assets/robot_obs.png";

const Sandbox = () => {
  const [gridCells, setGridCells] = useState(
    Array.from({ length: 81 }, () => null)
  );
  const [hoveredCell, setHoveredCell] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData("text/plain");

    setGridCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[targetIndex] = imageUrl;
      return newCells;
    });
  };

  const clearCell = (index) => {
    setGridCells((prevCells) => {
      const newCells = [...prevCells];
      newCells[index] = null;
      return newCells;
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const GridCell = ({ cellContent, index, onDragOver, onDrop }) => (
    <div
      key={index}
      className={`border border-gray-400 relative ${isDarkTheme ? "dark" : ""}`}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, index)}
      onMouseEnter={() => setHoveredCell(index)}
      onMouseLeave={() => setHoveredCell(null)}
    >
      {cellContent && (
        <img
          className="w-full h-full object-cover"
          src={cellContent}
          alt={`Cell ${index}`}
        />
      )}
      {hoveredCell === index && cellContent && (
        <button
          className="absolute top-6 right-[18px] bg-error dark:bg-dark-error opacity-60 hover:opacity-80 p-1 rounded-md text-f-accent"
          onClick={() => clearCell(index)}
        >
          Remove
        </button>
      )}
    </div>
  );

  return (
    <div
      className={`bg-bg ${
        isDarkTheme ? "dark" : ""
      } flex flex-col font-inter items-end justify-end mx-auto p-[18px] w-full`}
    >
      <div className="flex flex-col gap-6 justify-start mt-4 md:px-5 w-[94%] md:w-full">
        <div className="flex md:flex-row flex-row gap-[41px] items-center justify-start mr-[92px] w-[93%] md:w-full">
          <div className="border border-f border-solid flex flex-col gap-5 h-[1100px] items-start justify-start sm:px-5 rounded-[12px] w-[250px]">
            <div className="relative w-full mt-5 mb-3">
              <div className="border-2 border-f border-solid flex items-center p-1 rounded-[12px] w-full h-[38px]">
                <Img
                  className="h-[20px] md:h-auto my-0.5 mr-auto object-cover w-[20px]"
                  src={search}
                  alt="searchIcon"
                />
                <input
                  type="text"
                  className="w-full pl-4 py-1 text-base text-f-accent dark:text-dark-f placeholder-gray-900_05 focus:outline-none"
                  placeholder="Search Components"
                />
              </div>
            </div>
            <div className="bg-container flex flex-col h-[200px] items-center justify-start p-[3px] rounded-[12px] w-[208px]">
              <Img
                className="h-40 md:h-auto object-cover w-40"
                src={modular_bot}
                alt="modular_bot"
              />
              <Text
                className="mb-1 text-2xl md:text-[22px] text-f sm:text-xl"
                size="txtInterRegular24"
              >
                Modular Robot
              </Text>
            </div>
            <div className="common-pointer bg-container flex flex-col gap-[17px] h-[200px] items-center justify-end p-[7px] rounded-[12px] w-[208px]">
              <Img
                className="h-[106px] md:h-auto mt-[31px] object-cover w-[87%] sm:w-full"
                src={obs_bot}
                alt="obstaclebot"
              />
              <Text
                className="text-2xl md:text-[22px] text-f sm:text-xl"
                size="txtInterRegular24"
              >
                Obstacle Bot
              </Text>
            </div>
          </div>
          <div className="border border-f grid grid-cols-9 grid-rows-9 w-[1100px] h-[1100px] mx-auto ">
            {gridCells.map((cell, index) => (
              <GridCell
                key={index}
                cellContent={cell}
                index={index}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                handleDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-3.5 items-center justify-end md:ml-[0] ml-[1000px] w-[21%] md:w-full">
          {/* <Button className="cursor-pointer leading-[normal] w-[128px] h-[38px] text-2xl md:text-[18px] text-center text-primary-accent bg-primary rounded-md transition ease-in-out delay-100 hover:-translate-y-1">
            Cancel
          </Button>
          <Link to="/robotConfig">
            <Button className="common-pointer cursor-pointer leading-[normal] w-[128px] h-[38px] text-2xl md:text-[18px] text-center text-primary-accent bg-primary rounded-md transition ease-in-out delay-100 hover:-translate-y-1">
              Next
            </Button>
          </Link> */}
          {/* <button
            className={`toggle flex items-center justify-center p-2 bg-primary text-f-accent font-semibold rounded-lg cursor-pointer transform transition-transform ${isDarkTheme ? 'rotate-180' : ''}`}
            onClick={toggleTheme}
          >
            {isDarkTheme ? "☀️" : "☀️"} | {isDarkTheme ? "🌙" : "🌙"}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
