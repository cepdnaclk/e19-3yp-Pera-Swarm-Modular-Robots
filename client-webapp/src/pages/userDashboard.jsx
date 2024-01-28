import React from "react";
import axios from "../api/axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../App";
import { HtmlDialog } from "../components/dialogBox";

import ExperimentCard from "../components/expeimentCard";

const UserDashboard = () => {
  const user = useContext(UserContext);
  const [ showStartNewExperiment , setShowStartNewExperiment] = useState(false);

  const navigate = useNavigate();

  //   const [experiments, setExperiments] = useState([
  //     {
  //     name: "My experiment1",
  //     id: "123456",
  //     user_id: "user#123",
  //     attachments: ["wheel", "wheel", "arm"],
  //     schedule: "2024-04-05 1600h",
  //     status: "completed"
  //   },

  //     {
  //     name: "My experiment2",
  //     id: "78910",
  //     user_id: "user#321",
  //     attachments: ["Camera", "wheel", "arm"],
  //     schedule: "2024-04-05 2400h",
  //     status: "ready"
  //   },

  // ]);


  const NewExperimentStart = () => {
    const [experimentName, setExperimentName] = useState('');
    const [schedule, setSchedule] = useState(new Date().toISOString().slice(0, 16));

    const handleConfirm = () => {
      // console.log("Experiment Name: ", experimentName, "Schedule: ", schedule);
      navigate(`/robotConfig/${experimentName}/${schedule}`);
    };

    return (
      <div className="flex flex-col space-y-7 mt-5 text-left text-sm font-sans">
        <label className="flex flex-col">
          <span style={{ fontWeight: 'bold' }}>Experiment Name:</span>
          <input
            type="text"
            value={experimentName}
            onChange={e => setExperimentName(e.target.value)}
            className="px-2 m-1 py-1 border border-gray-300 rounded-md"
            required
          />
        </label>
          {user.role !== "experimenter_home" && (
        <label className="flex flex-col">
          <span style={{ fontWeight: 'bold' }}>Schedule:</span>
            <input
              type="datetime-local"
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
              className="px-2 m-1 py-1 border border-gray-300 rounded-md"
              required
            />
        </label>
          )}
        <button
          type="submit"
          onClick={handleConfirm}
          className="px-4 py-2 font-bold bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>

    );
  };


  const [experiments, setExperiments] = useState([]);
  const [readyExperiments, setreadyExperiments] = useState([]);

  const fetchExperiments = async () => {
    try {
      const res = await axios.get(`/api/experiment/${user.id}`);
      setExperiments(res.data);

      // Filter experiments with status "ready"
      const readyExperiments = res.data.filter(
        (experiment) => experiment.status === "ready"
      );
      setreadyExperiments(readyExperiments);


    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  // side button functions

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/experiment/${id}`);
      setExperiments(experiments.filter((experiment) => experiment._id !== id)); // TODO: check if this response is correct then filter out
      console.log("Deleted experiment with id: ", id);
    } catch (error) {
      console.error("Error:", error.response.data);
      // TODO: throw error dialog
    }
  };

  // TODO:
  const handleStartExperiment = (id) => {
    console.log("Handle Start Experiment", id);
    navigate(`/codeUpload/${id}`);
  };

  const handleLog = (id) => {
    console.log("Handle Log", id);
  };

  const handleVideo = (id) => {
    console.log("Handle Video", id);
  };

  return (
    <>
      <div className=" bg-primary/90  mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3 ">
        <div className="w-full grid grid-cols-3 gap-28 p-5">
          <div className="col-span-2 flex flex-col ">
            <h1 className="text-mainText font-light text-4xl font-sans">
              Dashboard
            </h1>

            <div className="block text-mainText my-3 p-6 bg-secondary border border-gray-200 rounded-lg shadow hover:bg-gray-100  border-ternary hover:bg-mainText/20">
              <h2 className="italic font-light">Now :</h2>
              {
              readyExperiments.length > 0 ? (
                readyExperiments.map(experiment =>
                  <p key={experiment.name} className="animate-pulse font-semibold">{experiment.name}</p>)
              ) : (
                <p className=" font-medium">None</p>
              )}
            </div>

            {/* Iterate over experiments */}
            {experiments.map((experiment) => (
              <div key={experiment._id}>
                <ExperimentCard
                  experiment={experiment}
                  userRole={user.role}
                  handleDelete={() => handleDelete(experiment._id)}
                  handleStartExperiment={() =>
                    handleStartExperiment(experiment._id)
                  }
                  handleLog={handleLog}
                  handleVideo={handleVideo}
                />
              </div>
            ))}
          </div>

          <div>
            <a
              // onClick={handleNewExperiment}
              onClick={()=>setShowStartNewExperiment(true)}
              className="cursor-pointer block text-right outline-dashed outline-mainText/50 outline-2 outline-offset-2 my-3  p-6 bg-secondary border border-gray-200 rounded-lg shadow hover:bg-lime-200/20  border-ternary "
            >
              <h5 className="mb-2 text-2xl font-thin tracking-tight text-mainText text-center">
                Start a new Experiment
              </h5>
              <div className="flex justify-center">
                <PlusIcon className="w-40 text-mainText/50 " />
              </div>
            </a>
          </div>
        </div>
      </div>
      <HtmlDialog showState={showStartNewExperiment} closefn={()=>setShowStartNewExperiment(false)} title={"Start a New Experiment"} data={NewExperimentStart()}/>
    </>
  );
};

export default UserDashboard;
