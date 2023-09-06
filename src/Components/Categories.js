import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMeals } from "../Features/MealsSlice";

const Categories = (arr) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(1);

  const handleClick = (id) => {
    setSelected(id);
  };

  return (
    <div className="flex flex-col justify-center px-8 items-center">
      <h2 className="text-lg font-semibold text-white text-center p-5 ">
        Godiva Menu
      </h2>
      {arr?.arr?.map((item, index) => {
        return (
          <div
            key={item.id}
            className={`xxs:text-[10px] xxs:w-[30%] xs:text-lg text-center mt-5 sm:w-28 px-8 flex flex-col justify-center items-center cursor-pointer ${
              selected === item.id ? "text-[#D0B05C]" : "text-[#CECECE]"
            }`}
            onClick={() => {
              handleClick(item.id);
              dispatch(getMeals(item.id));
            }}
          >
            {item.name}
            {selected === item.id ? (
              <div className="w-1.5 h-1.5 rounded-full bg-[#D0B05C] mt-1"></div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
