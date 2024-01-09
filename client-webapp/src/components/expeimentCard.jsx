// ExperimentCard.jsx
import React from "react";
import { Img, Text } from "../components";
import edit from "../assets/edit.png";
import dlt from "../assets/delete.png";
import { Link } from "react-router-dom";

const ExperimentCard = ({
  experimentName,
  experimentId,
  handleDelete,
  status,
  attachments,
  userDash,
  handleReady,
}) => {
  console.log("attachments", attachments);
  return (
    <div className="bg-container flex flex-1 flex-col items-center justify-end p-2 rounded-[12px] w-full">
      <div className="flex flex-col items-center justify-start mt-3.5 w-[99%] md:w-full">
        <div className="flex flex-col gap-[30px] justify-start w-full">
          <Text className="md:text-2xl ml-3 text sm:text-[28px] text-[32px] text-gray-900 font-serif">
            {experimentName}
          </Text>
          <div className="flex flex-row ml-1">
            <div className="flex flex-col gap-3 gap-left-5 items-start justify-start ml-[50px] w-[98%] md:w-full">
              <Text
                className="md:mt-0 mt-[9px] text-gray-900 text-xl  font-serif italic "
                size="txtInterRegular20"
              >
                Status: {status}
              </Text>
              {attachments && (
                <Text
                  className="md:mt-0 mt-[9px] text-gray-900 text-xl  font-serif italic "
                  size="txtInterRegular20"
                >
                  attachments :
                </Text>
              )}
              {attachments && (
                <span>
                  {attachments[0] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      TF: {attachments[0]}
                    </Text>
                  )}
                  {attachments[1] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      TR: {attachments[1]}
                    </Text>
                  )}
                  {attachments[2] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      TL: {attachments[2]}
                    </Text>
                  )}
                  {attachments[3] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      TB: {attachments[3]}
                    </Text>
                  )}
                  {attachments[4] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      BF: {attachments[4]}
                    </Text>
                  )}
                  {attachments[5] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      BR: {attachments[5]}
                    </Text>
                  )}
                  {attachments[6] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      BL: {attachments[6]}
                    </Text>
                  )}
                  {attachments[7] && (
                    <Text
                      className="text-gray-900 text-xl  font-serif italic"
                      size="txtInterRegular20"
                    >
                      BB: {attachments[7]}
                    </Text>
                  )}
                </span>
              )}
              {userDash && (
                <a className="cursor-pointer">
                  <Text
                    className="text-gray-900 text-xl underline font-serif italic"
                    size="txtInterRegular20"
                  >
                    Video
                  </Text>
                </a>
              )}
              {userDash && (
                <a className="cursor-pointer">
                  <Text
                    className="md:mt-0 mt-[9px] text-gray-900 text-xl underline font-serif italic "
                    size="txtInterRegular20"
                  >
                    Log
                  </Text>
                </a>
              )}
            </div>
            <span>
              {userDash === 1 ? (
                <div className="">
                  {/* Delete Button on the right */}
                  <button
                    className="cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 w-[30px] "
                    onClick={() => handleDelete(experimentId)}
                  >
                    <Img
                      className="h-8 md:h-auto ml-[140px] mt-6 object-cover w-8"
                      src={dlt}
                      alt="dltbutton"
                    />
                  </button>

                  {/* Run Experiment Button in the middle */}
                  {status === "ready" && userDash === 1 && (
                    <Link to={"/codeUpload"}>
                      <div className="">
                        <button className="cursor-pointer mt-6 mb-2 rounded-md leading-[normal] w-[180px] h-[40px] md:text-[19px] text-center text-f-accent bg-primary text-bg font-serif transition ease-in-out delay-100 hover:-translate-y-1">
                          Run Experiment
                        </button>
                      </div>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex  flex-col gap-4 h-8 items-center justify-start mr-[180px] mt-[70px] mb-4 w-8">
                  {/* <button className="cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1" onClick={()=>handleReady(experimentId)}>
                <Img
                  className="h-8 md:h-auto object-cover w-8"
                  src={edit}
                  alt="editbutton"
                />
              </button> */}
                  <button
                    className="cursor-pointer rounded-md leading-[normal] w-[180px] h-[50px] ml-auto md:text-[19px] text-center text-f-accent bg-primary text-bg font-serif transition ease-in-out delay-100 hover:-translate-y-1"
                    onClick={() => handleReady(experimentId)}
                  >
                    Ready
                  </button>
                </div>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentCard;
