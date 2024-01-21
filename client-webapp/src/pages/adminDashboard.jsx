///////////  TODO  ///////////

import React from "react";
import usericon from "../assets/user.png";
import ExperimentCard from "../components/expeimentCard";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [experiments, setExperiments] = useState([]);
  const navigate = useNavigate();
  // //const userId = "659c3128f8e19ef45832ea4a";
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  // const userId = user.id;

  const fetchExperiments = async () => {
    try {
      const res = await axios.get("/api/experiments");
      //console.log(res.data);
      setExperiments(res.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  //update an experiment
  // const handleReady = async (id) => {
  //   try {
  //     await axios.put(`/api/experiment/${id}`, { status: "ready" });
  //     console.log("Experiment updated");
  //     setExperiments(experiments.filter((experiment) => experiment._id !== id));
  //   } catch (error) {
  //     console.error("Error:", error.response.data);
  //   }
  // };

  //accept an experiment
  const handleAccept = async (id) => {
    try {
      await axios.put(`/api/experiment/${id}`, { status: "accepted" });
      console.log("Experiment accepted");
      setExperiments(experiments.filter((experiment) => experiment._id !== id));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  //setup it and ready to start
  //accept an experiment
  const handleReady = async (id) => {
    try {
      await axios.put(`/api/experiment/${id}`, { status: "ready" });
      console.log("Experiment accepted");
      setExperiments(experiments.filter((experiment) => experiment._id !== id));
      //navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  //Delete a request
  const handleDecline = async (id) => {
    try {
      await axios.put(`/api/experiment/${id}`, { status: "declined" });
      console.log("Experiment deleted");
      setExperiments(experiments.filter((experiment) => experiment._id !== id));
      //navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <div className=" bg-primary/90  mx-auto my-5 shadow-lg rounded-2xl flex max-w-7xl p-3 ">
        <div className="w-full flex flex-cols-3 gap-0 p-5">
          <div className="col-span-2 flex flex-col ">
            <h1 className="text-mainText font-light text-4xl font-sans">
              Dashboard
            </h1>

            <div className="block text-mainText my-3 p-6 bg-secondary border border-gray-200 rounded-lg shadow hover:bg-gray-100  border-ternary hover:bg-mainText/20">
              Upcoming Experiments : None
            </div>

            {/* Iterate over experiments */}
            {experiments.map((experiment) => (
              <div key={experiment._id}>
                {experiment._id && (
                  <ExperimentCard
                    experiment={experiment}
                    userRole={user.role}
                    handleAccept={() => handleAccept(experiment._id)}
                    handleDecline={() => handleDecline(experiment._id)}
                    handleReady={() => handleReady(experiment._id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
