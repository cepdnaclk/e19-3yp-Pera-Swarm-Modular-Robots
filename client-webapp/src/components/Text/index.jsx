import React from "react";

const sizeClasses = {
  txtInterRegular32Gray900: "font-inter font-normal",
  txtInterRegular20: "font-inter font-normal",
  txtInterRegular32: "font-inter font-normal",
  txtInterRegular12: "font-inter font-normal",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
