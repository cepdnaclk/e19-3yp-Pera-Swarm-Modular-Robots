import React, { useState } from "react";
import { Button, Img, Text } from "../components";
import Dropdown from "../components/dropdown";
import ImgCard from "../components/card";
import search from "../assets/search.png";
import camera from "../assets/camera.png";
import hand from "../assets/hand.png";
import wheel from "../assets/settings.png";

///////////

//////////
// dropdown menu option
const options = [
  { value: "ModularRobot1", label: "Modular Robot 1" },
  { value: "ModularRobot2", label: "Modular Robot 2" },
  { value: "ModularRobot3", label: "Modular Robot 3" },
];

const RobotConfig = () => {
  const [positions, setPositions] = useState([
    { id: 1, name: "Top Front", imageSrc: "", imgId: null },
    { id: 2, name: "Top Right", imageSrc: "", imgId: null },
    { id: 3, name: "Top Left", imageSrc: "", imgId: null },
    { id: 4, name: "Top Back", imageSrc: "", imgId: null },
  ]);

  //images of attchments
  const components = [
    {
      imageSrc: camera,
      id: 1,
      altText: "camera",
      label: "Camera",
      size: "txtInterRegular24",
    },
    {
      imageSrc: hand,
      id: "hand",
      altText: "hand",
      label: "Gripper Arm",
      size: "txtInterRegular24",
    },
    {
      imageSrc: wheel,
      id: "wheel",
      altText: "wheel",
      label: "Wheel",
      size: "txtInterRegular24",
    },
  ];

  //store image and position id
  // const [imageData, setImageData] = useState([
  //   { id: "camera", positionId: null },
  //   { id: "hand", positionId: null },
  //   { id: "wheel", positionId: null },
  // ]);

  const printImageData = () => {
    components.forEach((component) => {
      console.log(
        `component ID: ${component.id}, component name: ${component.label}, component img: ${component.imageSrc}`
      );
    });
    positions.forEach((position) => {
      console.log(
        `position ID: ${position.id}, Position name: ${position.name}, Position img: ${position.imgId}`
      );

      // Add your logic to send data to the backend here
    });
  };

  const displayComponents = () => {
    return components.map((component) => (
      <div
        key={component.id}
        className="bg-container flex flex-col w-[190px] h-[175px] items-center justify-start p-[3px] rounded-[12px] mb-6"
      >
        <div className="bg-trasnsparent flex flex-col w-[150px] h-[130px] items-center justify-start p-[3px] rounded-[12px]">
          <img
            className="object-cover w-auto h-full"
            id={component.id}
            src={component.imageSrc}
            alt={component.altText}
          />
        </div>

        <Text
          className={`mb-1 text-2xl md:text-[18px] sm:text-xl ${
            component.textColor || ""
          }`}
          size={component.size}
        >
          {component.label}
        </Text>
      </div>
    ));
  };

  const handleImageDrop = (targetPositionId, droppedImage) => {
    console.log("Dropped Image:", droppedImage);
    const updatedPositions = positions.map((position) =>
      position.id === targetPositionId
        ? {
            ...position,
            imageSrc: URL.createObjectURL(droppedImage),
            //  id property
          }
        : position
    );

    setPositions(updatedPositions);
  };

  const handleRemoveImage = (id) => {
    const updatedPositions = positions.map((position) =>
      position.id === id ? { ...position, imageSrc: "" } : position
    );

    setPositions(updatedPositions);
  };

  return (
    <>
      <div className=" bg-bg flex flex-col font-inter items-end justify-end mx-auto p-[18px] h-screen w-full">
        <div className="flex flex-col gap-6 justify-start md:px-5 w-[94%] md:w-full">
          <div className="flex md:flex-row flex-row gap-[41px] items-center justify-start mr-[92px] w-[93%] md:w-full">
            <div className="border border-f border-solid flex flex-col gap-5 h-[590px] overflow-y-scroll items-start justify-start sm:px-5 rounded-[12px] w-[250px]">
              {/* search bar */}
              <div className="relative w-full mt-5 mb-3">
                <div className="border-2 border-f border-solid flex items-center p-2.5 rounded-[12px] w-full h-[38px]">
                  <Img
                    className="h-[20px] md:h-auto my-0.5 mr-auto object-cover w-[20px]"
                    src={search}
                    alt="searchIcon"
                  />
                  <input
                    type="text"
                    className="w-full pl-4 py-1 text-base text-f placeholder-gray-900_05 focus:outline-none"
                    placeholder="Search Components"
                  />
                </div>
              </div>
              <div className="bg-container flex flex-col w-[190px] h-[175px] items-center justify-start p-[3px] rounded-[12px] ">
                {displayComponents()}
              </div>
            </div>
            <div className="border border-f grid w-[1100px] h-[590px]  rounded-[12px] overflow-hidden">
              <div className="flex flex-col">
                {/* dropdownn and the cards */}
                <div className="w-full mb-5">
                  <Dropdown items={options} />
                </div>
                {/* iterate through list positions and create cards */}
                <div className="flex flex-row">
                  {positions.map((position) => (
                    <ImgCard
                      key={position.id}
                      name={position.name}
                      imageSrc={position.imageSrc}
                      imgId={position.imgId}
                      onImageDrop={(droppedImage) =>
                        handleImageDrop(position.id, droppedImage)
                      }
                      onRemoveImage={() => handleRemoveImage(position.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3.5  ml-[1120px] w-[21%] md:w-full ">
            <Button className="cursor-pointer leading-[normal] w-[128px] h-[38px] text-2xl md:text-[18px] text-center text-bg bg-primary rounded-md transition ease-in-out delay-100 hover:-translate-y-1">
              Cancel
            </Button>
            <Button
              className="common-pointer cursor-pointer leading-[normal] w-[128px] h-[38px] text-2xl md:text-[18px] text-center text-bg bg-primary rounded-md transition ease-in-out delay-100 hover:-translate-y-1"
              //   onClick={() => navigate("/configurerobot")}
              onClick={printImageData}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RobotConfig;
