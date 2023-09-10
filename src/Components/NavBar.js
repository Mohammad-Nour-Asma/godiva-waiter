import React, { useEffect, useState } from "react";
import { ImHome } from "react-icons/im";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateMeals, emptyCart } from "../Features/CartSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const { total, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(calculateMeals());
  }, [cartItems]);

  return (
    <div className="flex justify-between align-center relative container w-[90%] py-5 px-2 mx-auto">
      <div className="realative flex gap-6 items-center">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="bg-white rounded-lg w-9 h-8 flex justify-center items-center"
        >
          <IoArrowBackCircleSharp style={{ fontSize: "1.5rem" }} />
        </button>
        <Link
          to={"/Orders"}
          onClick={() => {
            dispatch(emptyCart());
          }}
          className="border-2 p-[5px] rounded border-#232323"
        >
          <ImHome style={{ color: "white" }} />
        </Link>
      </div>
      <div className="realative flex gap-4">
        <Link
          to={"/"}
          style={{
            transition: "0.3s",
          }}
          onClick={() => {
            dispatch(emptyCart());
            localStorage.clear();
          }}
          className={`relative cursor-pointer  ${"text-[#BCBCBC] sm:text-base xxs:text-xs"}`}
        >
          Logout
        </Link>
        {location.pathname !== "/add-order" && (
          <>
            <div className="mealsAmount">{total}</div>
            <button
              onClick={() => {
                navigate("/order-cart");
              }}
              className="bg-white rounded-lg w-9 h-8 flex justify-center items-center"
            >
              <PiShoppingCartDuotone style={{ fontSize: "1.5rem" }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
