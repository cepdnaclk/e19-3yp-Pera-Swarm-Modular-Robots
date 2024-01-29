import React from "react";
import ExperimentCard from "../components/expeimentCard";
import axios from "../api/axios";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import CountUp from 'react-countup';

const AdminDashboard = () => {
  const [experiments, setExperiments] = useState([]);
  const [totalexperiments, setTotalExperiments] = useState(0);
  const [totalReq, setTotalReq] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  
  const user = useContext(UserContext);


  const fetchExperiments = async () => {
    try {
      const res = await axios.get("/api/experiments");
      setExperiments(res.data);
      setTotalExperiments(res.data.length);
      setTotalReq(res.data.filter(experiment => experiment.status === "pending").length);
    } catch (error) {
      alert("Oh no ! Something went wrong with backend.");
      console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  // Function to filter experiments based on search term
  const filterExperiments = () => {
    return experiments.filter((experiment) =>
      experiment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };


  const updateExperimentStatus = async (id, status) => {
    try {
      await axios.put(`/api/experiment/${id}`, { status });
      // Update the local state without a page reload
      setExperiments((prevExperiments) =>
        prevExperiments.map((experiment) =>
          experiment._id === id ? { ...experiment, status } : experiment
        )
      );
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleAccept = (id) => {
    updateExperimentStatus(id, "accepted");
    setTotalReq(totalReq - 1);
  };

  const handleReady = (id) => {
    updateExperimentStatus(id, "ready");
    
  };

  // CAN ADMIN DELETE REQUEST ???? SHOULD BE ABLE TO DECLINE ONLY right???

  //Delete a request
  // const handleDecline = async (id) => {
  //   try {
  //     await axios.put(`/api/experiment/${id}`, { status: "declined" });
  //     console.log("Experiment declined");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error:", error.response.data);
  //   }
  // };

  return (
    <>
      <div className=" bg-primary/90  mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3 ">
        <div className="w-full grid grid-cols-3 gap-28 p-5">
          <div className="col-span-2 flex flex-col ">
            <h1 className="text-mainText font-light text-4xl font-sans">
              Dashboard
            </h1>
            <div className="inline-flex items-center text-mainText my-3 p-6 bg-secondary border border-gray-200 rounded-lg shadow hover:bg-gray-100  border-ternary hover:bg-red-300/20">
            <span class="relative flex h-3 w-3 me-5">
              <span className="absolute inline-flex h-full w-full bg-red-300 rounded-full animate-ping"></span>
              <span className="relative inline-flex h-full w-full bg-red-500 rounded-full "></span>
            </span>
              <font className="font-thin me-5"># of experiments </font><font className="text-red-500"><font className="font-semibold me-5"> ready to start</font> <font className=" font-black"> {experiments.filter(experiment => experiment.status === "ready").length}</font></font>
            </div>

            {/* Search input */}
            <div className="flex mb-3">
              <input
                type="text"
                placeholder=">> Search by experiment name"
                className="outline-none bg-primary ring-2 ring-mainText/5 shadow-lg block w-96 rounded-md border-0 px-3.5 py-2 text-mainText  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Iterate over experiments */}
            {searchTerm === "" ? (
              experiments.map((experiment) => (
                <div key={experiment._id}>
                  {experiment._id && (
                    <ExperimentCard
                      experiment={experiment}
                      handleAccept={() => handleAccept(experiment._id)}
                      handleReady={() => handleReady(experiment._id)}
                    />
                  )}
                </div>
              ))
            ) : (
              filterExperiments().map((experiment) => (
                <div key={experiment._id}>
                  {experiment._id && (
                    <ExperimentCard
                      experiment={experiment}
                      handleAccept={() => handleAccept(experiment._id)}
                      handleReady={() => handleReady(experiment._id)}
                    />
                  )}
                </div>
              ))
            )}
          </div>

          <div>
            <div className="cursor-pointer block text-right outline-solid   outline-mainText/50 outline-2 outline-offset-2 my-3  p-6 bg-secondary border-8 border-gray-200 rounded-2xl shadow hover:bg-yellow-200/20  border-ternary/50 ">
              <h5 className="mb-2 text-xl font-thin tracking-tight text-mainText text-center ">
                Pending Requests
              </h5>
              <h5 className="mb-2 text-8xl font-bold tracking-tight text-mainText text-center">
                <CountUp end= { totalReq } duration={1} />
              </h5>
            </div>

            <div className="cursor-pointer block text-right outline-solid   outline-mainText/50 outline-2 outline-offset-2 my-3  p-6 bg-secondary border-8 border-gray-200 rounded-2xl shadow hover:bg-sky-200/20  border-ternary/50 ">
              <h5 className="mb-2 text-xl font-thin tracking-tight text-mainText text-center ">
                Total # of Experiments
              </h5>
              <h5 className="mb-2 text-8xl font-thin tracking-tight text-mainText text-center">
                <CountUp end= {totalexperiments} duration={3} />
              </h5>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
