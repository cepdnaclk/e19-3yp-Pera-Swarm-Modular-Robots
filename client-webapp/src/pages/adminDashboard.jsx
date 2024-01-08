////////////////////////////////////////
// AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Button, Img, List, Text } from "../components";
import logo from "../assets/logo.png";
import usericon from "../assets/user.png";
import ExperimentCard from "../components/expeimentCard";
import axios from "../api/axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [experiments, setExperiments] = useState([]);
  const userId = "659c3128f8e19ef45832ea4a";
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  console.log(user);

  useEffect(()=>{
      const fetchExperiments = async ()=>{
        try{
          const res = await axios.get(`/api/experiment/${userId}`)

          setExperiments(res.data) ;

        } catch (error) {
          console.error('Error:', error.response.data);
        }
      }
      fetchExperiments();
    },[setExperiments])

  //delete an experiment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/experiment/${id}`);
      setExperiments(experiments.filter((experiment) => experiment._id !== id));
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  }

  return (
    <>
      <div className="bg-bg flex flex-col font-inter gap-[18px] items-center justify-start mx-auto p-3 w-full">
        <div className="bg-container flex flex-row items-center justify-start max-w-[1410px] mx-auto p-[3px] md:px-5 rounded-[12px] w-full">
          <div className="flex flex-row md:gap-10 items-center justify-between my-0.5 w-full">
            <Img
              className="h-[75px] md:h-auto object-cover w-[60px]"
              src={logo}
              alt="logoOne"
            />
            <Img
              className="h-[50px] md:h-auto object-cover w-[50px]"
              src={usericon}
              alt="usericon"
            />
          </div>
        </div>
        <div className="bg-bg  border-container-accent border-solid flex flex-col items-center justify-start max-w-[1410px] mx-auto p-3.5 md:px-5 rounded-[12px] w-full">
          <div className="flex flex-col gap-[27px] justify-start mb-[3px] mt-2.5 w-full">
            {/* <Text
              className="mr-[938px] md:text-xl sm:text-[28px] text-[32px] text-f font-serif"
              size="txtInterRegular12"
            >
              Incoming Request: John Doe
            </Text> */}

            <Link to={"/sandbox"}>
              <button className="cursor-pointer rounded-md leading-[normal] w-[200px] h-[40px] ml-auto md:text-[19px]  text-center color-white bg-primary text-bg font-serif  transition ease-in-out delay-100 hover:-translate-y-1 ">
                Setup Experiment
              </button>
            </Link>
          </div>
        </div>
        <div className="border border-container-accent border-solid flex flex-col items-center justify-start max-w-[1410px] mb-3.5 mx-auto p-3 md:px-5 rounded-[12px] w-full">
          <div className="flex flex-col gap-[19px] justify-start mb-[101px] w-full">
            <div className="flex flex-col items-center justify-center p-2.5 w-auto">
              <Text
                className="md:text-4xl sm:text-[28px] text-[35px] text-f w-auto font-serif"
                size="txtInterRegular32"
              >
                Archive
              </Text>
            </div>
            {experiments.length === 0 ? ( <div className="flex flex-col items-center justify-center p-2.5 w-auto">
              <Text
                className="md:text-2xl sm:text-[28px] text-[35px] text-f w-auto font-serif"
                size="txtInterRegular32"
              >
                No Experiments to show. Please setup an experiment.
              </Text>
            </div>): 
            <List
            className="flex flex-col gap-[20px] items-center ml-2.5 md:ml-[0] w-full"
            orientation="vertical"
          >
            {experiments.map((experiment, index) => (
              <ExperimentCard key={index} experimentName={experiment.name} experimentId={experiment._id} handleDelete={handleDelete} status = {experiment.status} />
            ))}
          </List>}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

///////////////////////////////////////
