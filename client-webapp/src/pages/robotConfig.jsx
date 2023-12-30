import React, { useState } from "react";
import { Button, Img, Text } from "../components";
import Dropdown from "../components/dropdown";
import ImgCard from "../components/card";
import search from "../assets/search.png";
import camera from "../assets/camera.png";
import hand from "../assets/hand.png";
import wheel from "../assets/settings.png";

// dropdown menu option
const options = [
  { value: "ModularRobot1", label: "Modular Robot 1" },
  { value: "ModularRobot2", label: "Modular Robot 2" },
  { value: "ModularRobot3", label: "Modular Robot 3" },
];

const RobotConfig = () => {
  const [attachments, setAttachments] = useState([
    { id: 1, name: "Top Front", imageSrc: "" },
    { id: 2, name: "Top Right", imageSrc: "" },
    { id: 3, name: "Top Left", imageSrc: "" },
    { id: 4, name: "Top Back", imageSrc: "" },
  ]);
  const handleImageDrop = (id, droppedImage) => {
    const updatedAttachments = attachments.map((attachment) =>
      attachment.id === id
        ? { ...attachment, imageSrc: URL.createObjectURL(droppedImage) }
        : attachment
    );

    setAttachments(updatedAttachments);
  };
  const handleRemoveImage = (id) => {
    const updatedAttachments = attachments.map((attachment) =>
      attachment.id === id ? { ...attachment, imageSrc: "" } : attachment
    );

    setAttachments(updatedAttachments);
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
                <div className="bg-trasnsparent flex flex-col w-[150px] h-[130px] items-center justify-start p-[3px] rounded-[12px] ">
                  <Img
                    className=" object-cover w-auto h-full"
                    src={camera}
                    alt="camera"
                  />
                </div>
                <Text
                  className="mb-1 text-2xl md:text-[18px]  sm:text-xl"
                  size="txtInterRegular24"
                >
                  Camera
                </Text>
              </div>
              <div className="bg-container flex flex-col w-[190px] h-[175px] items-center justify-start p-[3px] rounded-[12px] ">
                <div className="bg-trasnsparent flex flex-col w-[150px] h-[130px] items-center justify-start p-[3px] rounded-[12px] ">
                  <Img
                    className=" object-cover w-auto h-full"
                    src={hand}
                    alt="hand"
                  />
                </div>
                <Text
                  className="mb-1 text-2xl md:text-[18px] text-gray-900 sm:text-xl"
                  size="txtInterRegular24"
                >
                  Gripper Arm
                </Text>
              </div>
              <div className="bg-container flex flex-col w-[190px] h-[175px] items-center justify-start p-[3px] rounded-[12px] ">
                <div className="bg-trasnsparent flex flex-col w-[150px] h-[130px] items-center justify-start p-[3px] rounded-[12px] ">
                  <Img
                    className=" object-cover w-auto h-full"
                    src={wheel}
                    alt="wheel"
                  />
                </div>
                <Text
                  className="mb-1 text-2xl md:text-[18px] text-gray-900 sm:text-xl"
                  size="txtInterRegular24"
                >
                  Wheel
                </Text>
              </div>
            </div>
            <div className="border border-f grid w-[1100px] h-[590px]  rounded-[12px] overflow-hidden">
              <div className="flex flex-col">
                {/* dropdownn and the cards */}
                <div className="w-full mb-5">
                  <Dropdown items={options} />
                </div>
                {/* iterate through list attachments and create cards */}
                <div className="flex flex-row">
                  {attachments.map((attachment) => (
                    <ImgCard
                      key={attachment.id}
                      name={attachment.name}
                      imageSrc={attachment.imageSrc}
                      onImageDrop={(droppedImage) =>
                        handleImageDrop(attachment.id, droppedImage)
                      }
                      onRemoveImage={() => handleRemoveImage(attachment.id)}
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
