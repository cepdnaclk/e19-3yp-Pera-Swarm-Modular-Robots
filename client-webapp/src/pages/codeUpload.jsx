import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
//import Modal from "react-modal";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import Header from '../components/header';


const CodeUpload = () => {
  //const userId = "659c3128f8e19ef45832ea4a";
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  const userId = user.id;
  console.log(userId);

  const [robotStatus, setRobotStatus] = useState("Unknown");
  const [attachmentsStatus, setAttachmentsStatus] = useState({
    arm: "unknown",
    wheels: "Unknown",
    camera: "Disconnected",
  });
  const [code, setCode] = useState("");
  //display the success dialog box when upload the code
  const [isUploadSuccessModalOpen, setIsUploadSuccessModalOpen] =
    useState(false);

  const [isUploadFailedModalOpen, setIsUploadFailedModalOpen] = useState(false);

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

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval for get updates every minute
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    // Clear interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  //submitting code
  const handleCodeSubmit = async () => {
    // Check if id is null before making the request
    if (userId === null) {
      console.error("Invalid id:", userId);
      return;
    }

    const apiUrl = `api/experiment/${userId}/code`;
    console.log("Code:", code);
    //console.log("Api Url:", apiUrl);

    const encodedCode = JSON.stringify(code);
    const value = { code: encodedCode, requirement: "" };
    try {
      const response = await axios.post(apiUrl, value);

      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Code submitted successfully");
        setIsUploadSuccessModalOpen(true);
      } else {
        console.error("Failed to submit code");
        setIsUploadFailedModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  const closeUploadSuccessModal = () => {
    setIsUploadSuccessModalOpen(false);
  };

  const closeUploadFailedModal = () => {
    setIsUploadFailedModalOpen(false);
  };

  return (
    <div>
      <Header/>
    <div className="flex h-screen">
      <div className="flex-none w-64 p-4 border-r flex flex-col">
        <div className="bg-container rounded p-4 flex-1">
          <h2 className="text-lg font-bold mb-4">Status</h2>
          <div className="mb-4">
            <b>Robot</b>: {robotStatus}
          </div>
          <div>
            <div>
              <b>Attachments Modules:</b>
            </div>
            <ul className="list-none pl-0">
              <li>&emsp;Arm : {attachmentsStatus.arm}</li>
              <li>&emsp;Wheels : {attachmentsStatus.wheels}</li>
              <li>&emsp;Camera : {attachmentsStatus.camera}</li>
            </ul>
          </div>
        </div>
        <div className="mt-auto gaps-3">
          <button
            onClick={handleCodeSubmit}
            className="bg-primary hover:bg-container-accent text-f-accent px-4 py-2 rounded mb-2 mt-3 ml-1 mr-7"
            >
            Submit
          </button>
          <button className="bg-primary hover:bg-container-accent text-f-accent px-4 py-2 rounded mb-2 mt-3 ml-6">
            Cancel
          </button>
        </div>
        {/* Upload Success Modal */}
        {/* <Modal
          className="w-[400px] h-[170px] bg-container ml-[600px] mt-[200px] p-5 rounded-md flex flex-col justify-center items-center"
          isOpen={isUploadSuccessModalOpen}
          onRequestClose={closeUploadSuccessModal}
          contentLabel="Upload Success Modal"
          >
          <div>
            <h2>Code Uploaded Successfully</h2>
            <button
            className="bg-error mt-3 ml-[70px] w-[100px] h-[40px] rounded-md text-primary-accent"
            onClick={closeUploadSuccessModal}
            >
            Close
            </button>
            </div>
          </Modal> */}

        {/* <Modal
          className="w-[400px] h-[170px] bg-container ml-[600px] mt-[200px] p-5 rounded-md flex flex-col justify-center items-center"
          isOpen={isUploadFailedModalOpen}
          onRequestClose={closeUploadFailedModal}
          contentLabel="Upload Failed Modal"
          >
          <div>
          <h2 className="mb-8 md:text-[22px]">Code Uploading Failed !</h2>
          <button
          className="bg-error mt-3 ml-[70px] w-[100px] h-[40px] rounded-md text-primary-accent"
          onClick={closeUploadFailedModal}
          >
          Close
          </button>
          </div>
        </Modal> */}
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          rows="10"
          placeholder="Enter your code here..."
          className="w-full border rounded p-2 mt-4"
          onChange={handleCodeChange}
          />
        <SyntaxHighlighter language="c" style={solarizedlight}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
          </div>
  );
};

export default CodeUpload;
