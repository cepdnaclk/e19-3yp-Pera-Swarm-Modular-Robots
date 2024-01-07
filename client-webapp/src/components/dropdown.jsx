import React, { useState } from "react";

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);

    // Print the id of the selected item
    //console.log("Selected item id:", item.id);
    sendSelected(item);
  };

  const sendSelected = (item) => {
    console.log("Robot number", item.id);
  };

  return (
    <div className="relative inline-block text-left w-screen">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-[1075px] max-w- mt-5 ml-3 mr-3 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
          onClick={handleToggle}
        >
          {selectedItem ? selectedItem.label : "Select an option"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="ml-3 mt-2 w-[1075px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:bg-container"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
