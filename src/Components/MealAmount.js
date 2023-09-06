import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, removeItem } from "../Features/CartSlice";
function MealAmount({ id }) {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);

  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    if (cartItems) getMealAmount(id);
  }, [cartItems]);

  const getMealAmount = (id) => {
    const item = cartItems.find((item) => item.id == id);
    if (!item) {
      setAmount(1);
    } else setAmount(item.amount);
  };
  return (
    <div className="mealAmount">
      <button
        onClick={() => {
          if (amount > 1) {
            dispatch(decrease(id));
          } else {
            dispatch(removeItem(id));
          }
        }}
      >
        <HiMiniMinusSmall />
      </button>
      <p>{amount}</p>
      <button
        onClick={() => {
          dispatch(increase(id));
        }}
      >
        <BsPlus />
      </button>
    </div>
  );
}

export default MealAmount;
