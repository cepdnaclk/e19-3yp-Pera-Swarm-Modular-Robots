import React, { useState } from "react";

const ImgCard = ({ imageSrc, name, imgId, onImageDrop, onRemoveImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedImage = files[0];

      onImageDrop(droppedImage);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRemoveImage = () => {
    onRemoveImage();
  };

  return (
    <div
      className={`h-[344px] w-[235px] rounded-xl m-5 overflow-hidden shadow-lg ${
        isDragging ? "border-4 border-dashed border-primary" : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-[300px] bg-container p-5">
        {imageSrc && (
          <img
            className="object-cover w-full h-auto"
            id={imgId}
            src={imageSrc}
            alt={name}
          />
        )}

        {isHovered && imageSrc && (
          <button
            className="relative ml-[65px] top-8 text-bg p-1 bg-f opacity-60 hover:opacity-80 hover:text-white rounded-md"
            onClick={handleRemoveImage}
          >
            Remove
          </button>
        )}
      </div>

      <div className="flex items-center justify-center py-2 bg-primary">
        <div className="font-bold text-l mb-1 text-bg">{name}</div>
      </div>
    </div>
  );
};

export default ImgCard;
