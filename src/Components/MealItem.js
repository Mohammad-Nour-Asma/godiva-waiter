import React from "react";
import { BsArrowReturnRight } from "react-icons/bs";

const MealItem = ({ name, qty, total, note }) => {
  return (
    <div className="p-3">
      <div className="flex text-sm align-items:center text-white justify-between ">
        <span>{name}</span>
        <span>Qty : {qty}</span>
        <span>{total} SAR</span>
      </div>
      {note?.length > 0 && (
        <span className="block text-sm pl-6 note relative text-white">
          <span
            style={{ color: "red", marginRight: "0.2rem" }}
            className="text-xs text-red"
          >
            <BsArrowReturnRight
              style={{
                display: "inline-block",

                margin: "0.1rem",
              }}
            />
            <span className="underline"> note:</span>
          </span>
          {note}
        </span>
      )}
    </div>
  );
};

export default MealItem;
