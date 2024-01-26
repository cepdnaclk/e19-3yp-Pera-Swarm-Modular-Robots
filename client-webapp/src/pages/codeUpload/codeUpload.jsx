import React, { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { Link , useParams , useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { highlight, languages } from "prismjs/components/prism-core";
import Editor from "react-simple-code-editor";
import "prismjs/components/prism-python"; // Import the Python language definition
import "./codeEditor.css";
import { Menu } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ErrorDialog } from "../../components/dialogBox";

const CodeUpload = () => {
  const user = useContext(UserContext);
  const { exp_id } = useParams();
  const navigate = useNavigate();

  const [robotStatus, setRobotStatus] = useState("Unknown");
  const [showFinishExpDialogBox, setShowFinishExpDialogBox] = useState(false);
  const [attachmentsStatus, setAttachmentsStatus] = useState({
    arm: "unknown",
    wheels: "connected",
    camera: "Disconnected",
  });

  const [robotsAvailable, setrobotsAvailable] = useState([
    "robot1",
    "robot2",
    "robot3",
    "robot3",
  ]);

  useEffect(() => {
    // Function to fetch attachments for a specific experiment
    const fetchAttachments = async () => {
      try {
        const res = await axios.get(`/api/experiment/${exp_id}/attachmentStatus`);
        setAttachmentsStatus(res.data);
        
      } catch (error) {
        alert("Error fetching attachments");
      }
    };

    // Call the fetchAttachments function when the component mounts
    fetchAttachments();
  }, [exp_id]);


  const [selectedRobot, setselectedRobot] = useState("Unknown");
  const [code, setCode] = useState("#type your code here");
  const [uploading, setUploading] = useState(false);
  const [serverUploadSuccess, setServerUploadSuccess] = useState(null);
  const [botUploadSuccess, setBotUploadSuccess] = useState(null);

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

  const handleRobotSelection = (robot) => {
    setselectedRobot(robot);
  };

  const UploadStatus = ({ message, success }) => {
    return (
      <div className="inline-flex items-center m-1.5">
        <span
          className={`w-5 h-5 me-2 text-sm font-semibold rounded-full flex-shrink-0 ${
            success === null ? "bg-gray-300" : success ? "bg-lime-200" : "bg-red-200"
          }`}
        >
          {success === null ? (
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          ) : success ? (
            <CheckIcon className="w-5 h-auto text-lime-800" />
          ) : (
            <XMarkIcon className="w-5 h-auto text-red-800" />
          )}
        </span>
        <p className={`inline-block ${success === null ? 'opacity-30' : ''}`}>{message}</p>
      </div>
    );
  };



  const handleCodeSubmit = async () => {
    try {
      // Disable the upload button during the upload process
      setUploading(true);

      // Simulate loading by setting both success states to null
      setServerUploadSuccess(null);
      setBotUploadSuccess(null);

      const req = { code: code, requirements: "" };

      // await setLoading(null);
      const res = await axios.post(`/api/experiment/${exp_id}/code`, req);
      // Simulate success for both server and bot uploads
      setServerUploadSuccess(res.data.backendUpload);
      setBotUploadSuccess(res.data.botUpload);
    } catch (error) {
      // Handle error, set success states to false
      setServerUploadSuccess(false);
      setBotUploadSuccess(false);
    } finally {
      // Enable the upload button after the upload process is complete
      setUploading(false);
    }
  };



  const handleFinishExperiment = async () => {
    try {
      await axios.put(`/api/experiment/${exp_id}`, { status: "completed" });
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Error finishing experiment", error);
      // Handle error if needed
    }
  };















  return (
    <>
      <div className="bg-primary/90 mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3">
        <div className="w-full grid grid-cols-4 gap-5 p-5">
          <div className="bg-ternary text-mainText rounded-md col-span-1 flex flex-col p-4 font-sans">
            <div>
              <h1 className="font-light text-4xl font-sans mb-12">
                Upload Your Code
              </h1>
              <Menu
                as="div"
                className="relative inline-block text-left bg-black rounded-md mb-5"
              >
                <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  Select a Robot 🤖
                </Menu.Button>
                <Menu.Items className="absolute z-10 bg-black rounded-md mt-1 w-full">
                  {robotsAvailable.map((robot) => (
                    <Menu.Item key={robot} className="cursor-pointer">
                      {({ active }) => (
                        <a
                          
                          onClick={() => {
                            handleRobotSelection(robot);
                          }}
                          className={`${
                            active ? "bg-violet-500 text-white" : "text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {robot}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
              <div className="text-sm font-normal">
                <h5 className="text-2xl mb-4">Status :</h5>
                <b>
                  Robot :{" "}
                  <font className="text-mainText"> {selectedRobot}</font>
                </b>
                <br />
                Health :{" "}
                <font style={{ color: getColorForValue(robotStatus) }}>
                  {" "}
                  {robotStatus}
                </font>
                <p className="mt-2">Attachments :</p>
                <div className="bg-primary/70 m-1 p-2 rounded-md">
                  {Object.entries(attachmentsStatus).map(
                    ([key, value], index) => (
                      <p key={index}>
                        {" "}
                        {key}:{" "}
                        <font style={{ color: getColorForValue(value) }}>
                          {value}
                        </font>
                      </p>
                    )
                  )}
                </div>
              </div>
              <div className="bg-primary/50 border-4 border-mainText/30 border-dashed  rounded-lg p-2 py-3 my-5 ">
              <button
                type="button"
                onClick={handleCodeSubmit}
                disabled={uploading} // Disable the button during the upload process
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg w-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <div className="flex items-center justify-center">
                {uploading ? (
                  // Show loading spinner during upload
                  
                    <div className="w-5 h-5 border-t-2 border-l-2 border-gray-200 animate-spin rounded-full" />
                 
                ) : (
                  // Show "Upload" text when not uploading
                  "Upload"
                )}
                 </div>
              </button>
                <div className="bg-primary/90 rounded-lg p-3 my-3 text-sm font-sans">
                  <UploadStatus message="Uploaded to server" success={serverUploadSuccess} />
                  <UploadStatus message="Uploaded to bot" success={botUploadSuccess} />
                </div>
              </div>
              <div className="text-center">
                <Link to={`/live/${exp_id}`}>
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900"
                  >
                    Go to Live Feed
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-ternary rounded-xl text-mainText col-span-3">
            <style>
              {`
                input:focus, textarea:focus, select:focus {
                  outline: none;
                }
              `}
            </style>
            <div
              className="bg-primary rounded-xl flex-1 m-4 p-4 overflow-auto"
              style={{ maxHeight: "90vh" }}
            >
              <Editor
                value={code}
                onValueChange={(_code) => setCode(_code)}
                highlight={(code) =>
                  highlight(code, languages.python, "python")
                }
                padding={10}
                style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  minHeight: "80vh",
                }}
              />
            </div>
            <div className="text-right m-4 mt-20">
              <button
                type="button"
                onClick={()=>setShowFinishExpDialogBox(true)}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Finish Experiment
              </button>
            </div>
          </div>
        </div>
              {/* not error dialog box */}
            <ErrorDialog
              showState={showFinishExpDialogBox}
              closefn={()=>{setShowFinishExpDialogBox(false)}}
              buttonClickFunction={() => handleFinishExperiment()}
              title="Attention !!"
              errMsg="Do You Want to Finish the Experiment"
              btnText="Yes"
            />
      </div>
    </>
  );
};

export default CodeUpload;
