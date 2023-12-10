
import React from 'react';
import Navbar from '../Navbar/Navbar';

import './Overview.css';
import video_robot_assemble from 'assets/robot360WebOptimized.mp4';

const Overview = (props) => {
  const { heading, text,showButton=false } = props;//Overview as prop to include ut in all pages

  return (
    <div className='overview-card'>
      <Navbar />
      <video className="background-video" autoPlay loop muted>
        <source src={video_robot_assemble} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='overview-content'>
        <div className='overview-header'>{heading}</div>
        <div className='overview-text'>{text}</div>
        {showButton && <a href='https://github.com/cepdnaclk/e19-3yp-Pera-Swarm-Modular-Robots.git'><button className="repo-button">View Repository</button></a>}
      </div>
    </div>
  );
}

export default Overview;
