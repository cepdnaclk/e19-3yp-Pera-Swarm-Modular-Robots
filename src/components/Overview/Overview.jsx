import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Overview.css';
import video_robot from 'assets/moduler.mp4';

const Overview = () => {
  return (
    <div className='overview-card'>
      <Navbar/>
        <video className="background-video" autoPlay loop muted>
          <source src={video_robot} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className='overview-content'>
        <div className='overview-text'>Multipurpose Robot developed for Swarm Uses.</div>
          <button className="repo-button">View Repository</button>
          

            
        </div>
      
    </div>
  );
}

export default Overview;
