import React from "react";
import "./Profile.css";
const Profile = ({ imageUrl, name, regNo, githubUsername }) => (
  <div className="profile-container">
    <img src={imageUrl} alt={"Image not Loaded"} className="profile-image" />
    <div className="profile-details">
      <p>{name}</p>
      {regNo && <p> {regNo}</p>}
      {githubUsername && (
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="github-button">Visit GitHub Profile</button>
        </a>
      )}
    </div>
  </div>
);

export default Profile;
