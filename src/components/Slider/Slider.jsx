import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Image ${index + 1}`}
            style={{
              margin: "0 auto", // Center horizontally using flexbox
              width: "100%",    // Adjust width to the container
              maxWidth: "700px", // Limit the maximum width
              height: "auto",    // Maintain the aspect ratio
              border: "1px solid #e0e0e0",  // Use a subtle border color
              borderRadius: "12px",         // Soften the border radius
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",  // Adjust box shadow
            }}
          />

        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
