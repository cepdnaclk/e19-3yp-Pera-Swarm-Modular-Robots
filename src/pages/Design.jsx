import Overview from "../components/Overview/Overview";
import "../css/Design.css";
import robot_360 from "../assets/robot_360.mp4";
import ImageSlider from "../components/Slider/Slider";
import bigpic from "../assets/bigpic.png";

const Design = () => {
  return (
    <>
      <Overview
        heading="Modular robot developed for multipurpose uses"
        text="Designs of the project"
      />
      <div className="design-block">
        <h1>Fusion 360 Design</h1>
      </div>
      <div className="design-block">
        <video className="video" autoPlay loop muted>
          <source src={robot_360} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="design-block">
        <h1>The Big Picture</h1>
      </div>
      <div className="design-block">
        <img id="bp" src={bigpic} alt="" />
      </div>
      <div className="design-block">
        <h1>User Interface of the WebApp</h1>
      </div>
      <div className="design-block">
        <ImageSlider />
      </div>
    </>
  );
};

export default Design;
