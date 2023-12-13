import React, { useState, useEffect } from "react";
import app1 from "../../assets/app1.png";
import app2 from "../../assets/app2.png";
import app3 from "../../assets/app3.png";
import app4 from "../../assets/app4.png";
import app5 from "../../assets/app5.png";
import app6 from "../../assets/app6.png";
import app7 from "../../assets/app7.png";
import app8 from "../../assets/app8.png";

const ImageSlider = () => {
  const images = [app1, app2, app3, app4, app5, app6, app7, app8];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move to the next image, and loop back to the first image if at the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the duration as needed (in milliseconds)

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [currentImageIndex, images.length]);

  return (
    <div>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        style={{
          Width: "700px",
          Height: "300px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      />
    </div>
  );
};

export default ImageSlider;
