import React, { useEffect } from "react";
import Overview from "../components/Overview/Overview";
import Block from "../components/Block/Block";
import robot from "../assets/robot.jfif";
import homevid from "../assets/homevid.mp4";
import "../css/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/About.css";
import Card from "../components/Card/Card";


const Home = () => {
  const spanStyle = {
    fontWeight: "bold",
  };
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 200, once: true });
  }, []);
 
  return (
    <div className="page">
      <div className="particle-effect-container"></div>
      
      {
        <Overview
          heading="Swarm Capable Modular robots: for multipurpose uses"
          text="Overview of the project"
          showButton={true}
        />
      }
      <div className="content">
        <Block
          vidUrl={homevid}
          title="Progress Upto Now"
          content="Discover the current strides in our project through an insightful video. Witness the fusion of art and technology as we design our robot with precision in Fusion 360, 3D print essential components, and unveil a sleek and intuitive web app login UI. Stay tuned as innovation unfolds at every turn. "
        />
        <Block
          imageUrl={robot}
          title="Introduction to Swarm modular Robot"
          content="
          Introducing our Swarm Capable Modular Robot, a marvel of technological versatility poised to revolutionize industries far and wide. This cutting-edge robotic system boasts a modular design that effortlessly adapts to an extensive array of tasks across various sectors. The incorporation of Universal Ports serves as a dynamic interface, seamlessly connecting both hardware and software attachments for unparalleled flexibility. With intended attachments ranging from a Gripper arm to a Camera and Distant Sensor, this robot ensures adaptability for intricate tasks and precise environmental awareness. What sets it apart is the ease of attachment swapping, allowing swift transitions between functions and maximizing operational efficiency. Embodying a cost-effective solution, our Swarm Capable Modular Robot paves the way for accessible and affordable integration of advanced robotics into diverse applications. Welcome to a future where adaptability meets unparalleled efficiency."
        />
        <Block
          title="Problems we are addressing"
          content="Limited scalability and Limited scope of tasks of ordinary modular robots"
        />

        <div className="features-set">
          <h1>We Offer...</h1>
          <div className="features">
            <Card
              title={"Modularity"}
              description={
                "Easily attach and detach a variety of modules for versatile functionality."
              }
            />
            <Card
              title={"Swarm Capability"}
              description={
                "Coordinate multiple robots to perform complex tasks efficiently"
              }
            />
            <Card
              title={"IoT Integration"}
              description={
                "Real-time connectivity and data sharing for enhanced coordination"
              }
            />
            <Card
              title={"User-Friendly Interface"}
              description={
                "Intuitive control through browser and mobile applications"
              }
            />
            <Card
              title={"Scalability"}
              description={
                "Expand the swarm by adding more robots and modules as needed"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
