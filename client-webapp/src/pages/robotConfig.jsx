import React, { useState } from "react";
import { Button, Text } from "../components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dropdown from "../components/dropdown";
import search from "../assets/search.png";
import camera from "../assets/camera.png";
import hand from "../assets/hand.png";
import wheel from "../assets/settings.png";
import axios from "axios";
import Header from '../components/header';

const options = [
  { id: 1, value: "ModularRobot1", label: "Modular Robot 1" },
  { id: 2, value: "ModularRobot2", label: "Modular Robot 2" },
  { id: 3, value: "ModularRobot3", label: "Modular Robot 3" },
];

const ItemTypes = {
  IMAGE: "image",
  CONTAINER: "container",
};

const imagesList = [
  { id: "wheel", value: wheel, label: "Wheel", size: "txtInterRegular24" },
  { id: "arm", value: hand, label: "Gripper Arm", size: "txtInterRegular24" },
  { id: "camera", value: camera, label: "Camera", size: "txtInterRegular24" },
];

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

const Image = ({ id, src, onDrop }) => {
  const [, drag] = useDrag({
    type: ItemTypes.IMAGE,
    item: { id },
  });

  return (
  
      
    <img
      ref={drag}
      src={src}
      alt={`Image ${id}`}
      className="w-auto h-full m-2 cursor-pointer pt-2"
      />
  
  );
};

const Container = ({
  id,
  name,
  onDrop,
  children,
  droppedImages,
  setDroppedItems,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop: (item) => onDrop(item.id, id),
  });
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleRemoveButtonClick = () => {
    // Identify the container from which the image should be removed
    setDroppedItems((prevDroppedItems) => {
      const updatedDroppedItems = prevDroppedItems.filter(
        (image) => image.containerId !== id
        );
        return updatedDroppedItems;
      });
    };
    
    return (
      <div
      ref={drop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-[300px] w-[235px] rounded-xl m-5 overflow-hidden shadow-lg border-4 bg-container border-primary relative"
      >
      <div className="h-[220px] w-[210px] p-2 flex items-center justify-center relative">
        {droppedImages.map((image) => (
          <img
          className="object-fit w-full h-auto"
          key={image.id}
          src={image.value}
          alt={`Dropped Image ${image.id}`}
          />
          ))}

        {children}
      </div>
      {isHovered && droppedImages.length > 0 && (
        <button
        onClick={handleRemoveButtonClick}
        className="absolute top-[10px] right-3 w-6 h-6 bg-f rounded-full text-primary-accent cursor-pointer"
        >
          X
        </button>
      )}
      <div className="w-full flex items-center justify-center py-2 bg-primary mt-[35px]">
        <div className="font-bold text-l mb-1 text-primary-accent">{name}</div>
      </div>
    </div>
  
  );
};

const RobotConfig = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleDrop = (imageId, containerId) => {
    console.log(
      `Image ID: ${imageId} dropped into Container ID: ${containerId}`
    );

    const existingItemIndex = droppedItems.findIndex(
      (item) => item.containerId === containerId
    );

    if (existingItemIndex !== -1) {
      // Replace existing image in the container
      droppedItems[existingItemIndex] = {
        imageId,
        containerId,
        value: imagesList.find((image) => image.id === imageId).value,
      };
      setDroppedItems([...droppedItems]);
    } else {
      // Add new image to the container
      const newDroppedItem = {
        imageId,
        containerId,
        value: imagesList.find((image) => image.id === imageId).value,
      };
      setDroppedItems([...droppedItems, newDroppedItem]);
    }
  };

  //Select the dropdown id
  const handleOptionSelect = (optionId) => {
    setSelectedOptionId(optionId);
    console.log("Selected robot:", optionId);
  };

  const sendDatatoBackend = () => {
    // Create an array of container and image pairs
    const containerImagePairs = droppedItems.map((item) => ({
      containerId: item.containerId,
      imageId: item.imageId,
    }));
    console.log(
      "Sending to backend:",
      "Robot selected",
      selectedOptionId,
      "Conainer,img pairs",
      containerImagePairs
    );
    // Send the data to the backend
    axios
      .post(
        "backend-api-endpoint",
        { optionId: selectedOptionId },
        { containerImagePairs }
      )
      .then((response) => {
        console.log("Backend response:", response.data);
        // Handle the response from the backend as needed
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
        // Handle errors
      });
  };

  return (
    <div>
      <Header/>
    <DndProvider backend={HTML5Backend}>
      <>
        <div className=" bg-bg flex flex-col font-inter items-end justify-end mx-auto p-t5 h-screen w-full">
          <div className="flex flex-col gap-6 justify-start md:px-5 w-[94%] md:w-full">
            <div className="flex md:flex-row flex-row gap-[41px] items-center justify-start mr-[92px] w-[93%] md:w-full">
              <div className="border border-f border-solid flex flex-col gap-5 h-[590px]  items-start justify-start sm:px-5 rounded-[12px] w-[250px]">
                {/* search bar */}
                <div className="relative w-full mt-5 mb-3">
                  <div className="border-2 border-f border-solid flex items-center p-2.5 rounded-[12px] w-full h-[38px]">
                    <img
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
                <div className=" overflow-y-scroll">
                  <div className="bg-bg flex flex-col mr-5 rounded-[12px] ">
                    {imagesList.map((image) => (
                      <div className="bg-container flex flex-col w-[190px] h-[175px] items-center justify-start p-[3px] rounded-[12px] mb-6">
                        <div className="bg-transparent flex flex-col w-[150px] h-[130px] items-center justify-center p-[4px] rounded-[12px]">
                          <Image
                            className="object-cover w-auto h-full"
                            key={image.id}
                            id={image.id}
                            src={image.value}
                            onDrop={handleDrop}
                          />
                        </div>
                        <Text
                          className={`mt-2 mb-1 text-2xl md:text-[18px] sm:text-xl `}
                          size={image.size}
                        >
                          {image.label}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border border-f grid w-[1120px] h-[590px]  flex-col rounded-[12px]  ">
                {/* dropdownn and the cards */}
                <div className="w-full ml-2 mb-5">
                  <Dropdown items={options} onSelect={handleOptionSelect} />
                </div>
                {/* iterate through list positions and create cards */}
                <div className="overflow-y-scroll mr-[428px]">
                  <div className="flex flex-wrap w-[1120px] ">
                    {ContainersList.map((container) => (
                      <Container
                      key={container.id}
                      id={container.id}
                      name={container.name}
                      onDrop={handleDrop}
                      droppedImages={droppedItems.filter(
                        (item) => item.containerId === container.id
                        )}
                        setDroppedItems={setDroppedItems}
                        />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4  ml-[1120px] w-[21%] md:w-full ">
              <Button className="cursor-pointer leading-[normal] w-[128px] h-[38px] text-2xl md:text-[18px] text-center text-primary-accent bg-primary rounded-md transition ease-in-out delay-100 hover:-translate-y-1">
                Cancel
              </Button>

              <Button
                onClick={sendDatatoBackend}
                className="cursor-pointer leading-[normal] w-[128px] h-[38px] text-2xl md:text-[18px] text-center text-primary-accent bg-primary rounded-md transition ease-in-out delay-100 hover:-translate-y-1"
                >
                Next
              </Button>
            </div>
          </div>
        </div>
      </>
    </DndProvider>
                </div>
  
  );
};

export default RobotConfig;
