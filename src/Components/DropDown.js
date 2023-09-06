import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOrderTable } from "../Features/CartSlice";

function DropdownMenu({ selected, setSelected, array }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative rounded  text-center">
      <button
        className="border-2 border-[#e7c66f] text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        <span>{selected}</span>
        <svg
          className={`fill-current h-4 w-4 ml-2 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
        </svg>
      </button>

      <ul
        style={{
          transition: "max-height 0.4s ",
          transition: "0.6s ",
          maxHeight: isOpen ? "200px" : "0", // Adjust "500px" to a value that suits your content
          opacity: isOpen ? "1" : "0", // Adjust "500px" to a value that suits your content
          overflow: "hidden",
          borderRadius: "10px ",
          overflowY: isOpen ? "auto" : "hidden",
          top: "calc(100% + 10px)",
          margin: "0 auto",
          width: "80%",
          left: "50%",

          transform: isOpen
            ? "scale(1) translate(-50%)"
            : "scale(0) translate(-50%)",
          transformOrigin: "center left",
          boxShadow: "rgb(150 123 53 / 60%) 1px 10px 10px -2px",
        }}
        className={`absolute  w-20 dropdown-items  text-gray-700 pt-1`}
      >
        {array?.map((item, index) => {
          return (
            <li
              onClick={(e) => {
                setSelected(e.target.textContent);
                setIsOpen(false);
              }}
              key={index}
              className=" bg-gray-200 hover:bg-gray-400 cursor-pointer py-2 px-8 block whitespace-no-wrap"
            >
              {item?.table_number}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DropdownMenu;
