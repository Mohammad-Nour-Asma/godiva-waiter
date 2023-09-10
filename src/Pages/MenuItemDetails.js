import React, { useEffect, useState } from "react";
import item from "../assets/60e5c6caad0423493625ff35-optimized.png";
import { FaRightLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import Heading from "../Components/Heading";
import MealAmount from "../Components/MealAmount";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setMealNote } from "../Features/CartSlice";
import { request } from "../hooks/request";
import useFetch from "../hooks/useFetch";

const MenuItemDetails = ({ show }) => {
  const [note, setNote] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, loading } = useFetch(`/meals/${id}`);

  const item = data?.data?.length > 0 ? data.data[0] : {};

  return (
    <div className="w-full min-h-screen bg-[#232323]">
      <Heading title={item?.name} />
      <div className="flex justify-center items-center">
        <img
          className="sm:h-60 xs:h-64 rounded-lg"
          src={`https://api.godiva.gomaplus.tech${item.image}`}
        />
      </div>
      <div className="md:px-20 mt-4 sm:px-1">
        {!show && (
          <>
            <h2
              style={{
                width: "fit-content",
                paddingRight: "0.3rem",
              }}
              className="border-b border-[#FFDD83] xxs:w-20 sm:w-24 w-fit  sm:text-base xxs:text-xs text-[#FFDD83]"
            >
              Note
            </h2>
            <div className="sm:w-[50%] bg-gray-200 mt-3 mb-5 border rounded-md p-3">
              <input
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                value={note}
                type="text"
                className="w-[100%]  bg-gray-200 outline-none text-black"
              />
            </div>
          </>
        )}
        <div className="flex justify-between  mb-2">
          <h2 className="md:text-lg xxs:text-md text-white">
            <span className="md:text-sm xxs:text-xs text-[#FFDD83]">
              Description
            </span>
          </h2>
          <h2 className="d:text-lg xxs:text-md text-[#FF0027]">
            {item?.price} SAR
          </h2>
        </div>
        <div className="text-white ">
          <h2 style={{ margin: "0.3rem 0" }}>
            <span className="font-bold mr-2 ">
              <AiOutlineStar className="inline-block" />
            </span>
            {item?.description}
          </h2>
        </div>
        <div className="flex justify-between mt-5 mb-2">
          <h2 className="md:text-lg xxs:text-md text-white">
            <span className="md:text-sm xxs:text-xs text-[#FFDD83]">
              Calories
            </span>
          </h2>
        </div>
        <div className="text-white  ">
          <h2 style={{ margin: "0.3rem 0" }}>
            <span className="font-bold mr-2 ">
              <AiOutlineStar className="inline-block" />
            </span>
            {item?.calories} cal
          </h2>
        </div>

        {!show && (
          <div className=" px-2 flex justify-between items-center">
            <div className="my-5"></div>
            <Link
              to="/order-from-menu"
              className="text-white font-bold underline"
              onClick={() => {
                dispatch(
                  addToCart({
                    amount: 1,
                    id: +item.id,
                    name: item.name,
                    note: "",
                    price: item.price,
                    amount: 1,
                    image: `https://api.godiva.gomaplus.tech${item.image}`,
                  })
                );
                if (note.trim().length > 0) {
                  dispatch(setMealNote({ id, note }));
                }
              }}
            >
              Confirm
              <FaRightLong
                className="right"
                style={{
                  fontWeight: "bold",
                  display: "inline-block",
                  color: "white",
                  margin: "0 0.3rem",
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemDetails;
