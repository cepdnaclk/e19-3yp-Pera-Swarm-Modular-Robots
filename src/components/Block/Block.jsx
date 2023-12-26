// Block.js

import React, { useRef, useEffect } from "react";
import "./Block.css";
import thumbImage from "../../assets/thumb.png";


const Block = ({ title, content, imageUrl, vidUrl }) => {
  const blockRef = useRef();

  useEffect(() => {
    const blockElement = blockRef.current;
    const handleScroll = () => {
      const blockTop = blockElement.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (blockTop < scrollY + windowHeight - 100) {
        blockElement.classList.add("fade-in");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="block" ref={blockRef}>
      {imageUrl && <img src={imageUrl} alt={"Load failed"} />}
      {vidUrl && (
      <div className="video-container">
      <video controls playsInline poster={thumbImage}>
      <source src={vidUrl} type="video/mp4" />
      Your browser does not support the video tag.
      </video>
     </div>
)}


      <div className="block-content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Block;
