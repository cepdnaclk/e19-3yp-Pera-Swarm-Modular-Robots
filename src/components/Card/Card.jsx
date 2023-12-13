import React from "react";
import "./Card.css";
const Card = ({ iconClass, title, description }) => {
  return (
    <div className="icon-box">
      <div className="icon">{iconClass && <i className={iconClass}></i>}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};
export default Card;
