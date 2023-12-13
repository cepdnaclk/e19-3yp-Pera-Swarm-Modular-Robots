import Overview from "../components/Overview/Overview";
import "../css/Design.css";
import robot_360 from "../assets/robot_360.mp4";

const Design = () => {
  return (
    <>
      <Overview
        heading="Modular robot developed for multipurpose uses"
        text="Designs of the project"
      />
      <div className="design-block">
        <h1>3D model</h1>
        <img src="" alt="" />
      </div>
      <div className="design-block">
        <h1>Fusion 360 Design</h1>
        <video className="video" autoPlay loop muted>
          <source src={robot_360} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default Design;
