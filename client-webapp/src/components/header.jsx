import React from "react";
import "./header.css";
import logo from "../assets/logo.svg";
import user from "../assets/user.png";

const Header = (props) => {
  const { username } = props;
  return (
    <div className="card">
      <div className="content">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="user">
          {username}
          <img src={user} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
