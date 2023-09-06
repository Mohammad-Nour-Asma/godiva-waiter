import React from "react";

import MealAmount from "./MealAmount";

const CartItem = ({ title, img, amount, price, type, id }) => {
  return (
    <div className="bg-white xs:w-[90%] md:w-[70%]  my-3 px-3  mx-auto items-center p-2 rounded-xl">
      <div className="bg-white flex justify-around  items-center ">
        <div className="flex-1">
          <img style={{ maxWidth: "80%", borderRadius: "10px" }} src={img} />
        </div>
        <div className="flex-1">
          <div className="flex gap-5 items-center">
            <p className="font-semibold">{title}</p>
            <p className="text-sky-500">x{amount}</p>
          </div>
          <p className="font-semibold lg:my-1">{type}</p>
          <p className="text-[0.7rem] font-semibold text-red-500">
            {price} SAR
          </p>
        </div>
      </div>
      <div className="d-block my-2 ml-auto">
        <MealAmount id={id} />
      </div>
    </div>
  );
};

export default CartItem;
