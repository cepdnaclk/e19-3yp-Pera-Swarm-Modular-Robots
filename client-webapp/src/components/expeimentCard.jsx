// ExperimentCard.jsx
import React from "react";
import { Img, Text } from "../components";
import edit from "../assets/edit.png";
import dlt from "../assets/delete.png";
import { Link } from "react-router-dom";

const ExperimentCard = ({ experimentName, experimentId, handleDelete , status, attatchments, userDash,handleReady}) => {
  console.log("attatchments", attatchments)
  return (
    <div className="bg-container flex flex-1 flex-col items-center justify-end p-2.5 rounded-[12px] w-full">
      <div className="flex flex-col items-center justify-start mt-3.5 w-[99%] md:w-full">
        <div className="flex flex-col gap-[30px] justify-start w-full">
          <Text className="md:text-2xl tex sm:text-[28px] text-[32px] text-gray-900 font-serif">
            {experimentName}
          </Text>
          <div className="flex flex-row">
            <div className="flex flex-col gap-5 gap-left-5 items-start justify-start ml-[50px] w-[98%] md:w-full">
              <Text
                  className="md:mt-0 mt-[9px] text-gray-900 text-xl  font-serif italic "
                  size="txtInterRegular20"
                >
                  Status: {status}
              </Text>
              {attatchments &&<Text
                  className="md:mt-0 mt-[9px] text-gray-900 text-xl  font-serif italic "
                  size="txtInterRegular20"
                >
                  Attatchments :
              </Text>}
              {attatchments && 
                <span >
                  {attatchments[0]&& <Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    TF: {attatchments[0]}
  
                  </Text>}
                  {attatchments[1]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    TR: {attatchments[1]}
  
                  </Text>}
                  {attatchments[2]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    TL: {attatchments[2]}
  
                  </Text>}
                  {attatchments[3]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    TB: {attatchments[3]}
  
                  </Text>}
                  {attatchments[4]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    BF: {attatchments[4]}
  
                  </Text>}
                  {attatchments[5]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    BR: {attatchments[5]}
  
                  </Text>}
                  {attatchments[6]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                    BL: {attatchments[6]}
  
                  </Text>}
                  {attatchments[7]&&<Text
                    className="text-gray-900 text-xl  font-serif italic"
                    size="txtInterRegular20"
                  >
                   BB: {attatchments[7]}
  
                  </Text>}
                </span>
            
              
                }
              {userDash &&<a className="cursor-pointer">
                <Text
                  className="text-gray-900 text-xl underline font-serif italic"
                  size="txtInterRegular20"
                >
                  Video
                </Text>
              </a>}
              {userDash && <a className="cursor-pointer">
                <Text
                  className="md:mt-0 mt-[9px] text-gray-900 text-xl underline font-serif italic "
                  size="txtInterRegular20"
                >
                  Log
                </Text>
              </a>}
            </div>
            <span>
            {userDash ===1 ?(<div className="flex flex-col gap-4 h-8 items-center justify-start mr-5 w-8">
              
              <button className="cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1" onClick={()=>handleDelete(experimentId)} >
                <Img
                  className="h-8 md:h-auto ml-2 md:ml-[0] object-cover w-8"
                  src={dlt}
                  alt="dltbutton"
                />
              </button>
              <button className="cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1">
              {status === "ready" && userDash===1 && <div className="flex flex-col gap-4 h-8 items-center justify-start mr-5 w-8">
            <Link to={"/codeUpload"}>
              <button className="cursor-pointer rounded-md leading-[normal] w-[200px] h-[40px] ml-auto md:text-[19px]  text-center text-f-accent bg-primary text-bg font-serif  transition ease-in-out delay-100 hover:-translate-y-1 ">
                Run Experiment
              </button>
            </Link>
              </div>}
              </button>
            </div> )
            : (<div className="flex flex-col gap-4 h-8 items-center justify-start mr-5 w-8">
                <button className="cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1" onClick={()=>handleReady(experimentId)}>
                <Img
                  className="h-8 md:h-auto object-cover w-8"
                  src={edit}
                  alt="editbutton"
                />
              </button>
            </div>)}
            
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentCard;
