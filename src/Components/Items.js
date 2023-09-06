import React, { useEffect, useState } from "react";
import item1 from "../assets/60e5cb13ad04234936260744-optimized 2.png";
import item2 from "../assets/60e5cb13ad04234936260744-optimized 3.png";
import item3 from "../assets/60e5cb13ad04234936260744-optimized 4.png";
import item4 from "../assets/60e5cb13ad04234936260744-optimized 5.png";
import item5 from "../assets/60e5cb13ad04234936260744-optimized 6.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../Features/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Items = (arr) => {
  const location = useLocation();

  const [selected, setSelected] = useState("");
  const handleClick = (index) => {
    setSelected(index);
  };

  const navigate = useNavigate();

  const [meal, setMeal] = useState({
    amount: 1,
    id: 1,
    name: "mealName",
    note: "",
    price: 10,
    amount: 1,
    image: "",
  });
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  function truncateString(str) {
    if (str == null || str === undefined) {
      return "";
    }

    if (str.length <= 100) {
      return str;
    }

    return str.slice(0, 100);
  }
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 sm:p-7 xs:p-6 p-2 mt-10">
      {arr.arr?.map((item, index) => {
        return (
          <button
            key={index}
            className=" text-white p-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-[#FFDD83] border border-white hover:border-[#FFDD83] rounded-xl"
            onClick={() => {
              handleClick(index);

              if (location.pathname === "/menu") {
                navigate(`/menuItemDetails/${item.id}`);
              } else {
                navigate(`/order-item/${item.id}`);
              }
            }}
          >
            <div className=" flex justify-between relative flex-col items-center gap-3 h-72 ">
              <div
                className="rounded-xl w-[150px] h-[150px] absolute top-3   "
                style={{
                  backgroundImage: `url(https://api.godiva.gomaplus.tech${item.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className=" mt-44 ">
                <h2 className="sm:text-lg xxs:text-[10px] whitespace-normal">
                  {" "}
                  {item.name}
                </h2>
                <h2 className="sm:text-[13px] xxs:text-[10px] font-thin mt-3 text-[#CECECE]">
                  {truncateString(item.description) + "..."}
                </h2>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Items;
