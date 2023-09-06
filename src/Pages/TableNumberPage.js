import React, { useState } from "react";
import fork from "../assets/fork_1046857 1.png";
import { FaRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../Components/DropDown";
import { useDispatch } from "react-redux";
import { setOrderTable } from "../Features/CartSlice";
import useFetch from "../hooks/useFetch";

const TableNumberPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("select table");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { loading, data } = useFetch("/tables");

  return (
    <div style={{ minHeight: "calc(100vh - 72px)" }} className="">
      <div className=" mx-auto p-12">
        <div className="flex flex-col justify-center items-center gap-7">
          <div className="bg-white rounded-xl shadow-md sm:w-28 sm:h-28 w-24 h-24 flex flex-col justify-center items-center">
            <img className="w-16 h-16" src={fork} />
            <h2 className="text-center items-center text-[#D4AE4C]">GODIVA</h2>
          </div>
          <h2 className="text-center md:text-3xl text-2xl md:w-80 w-64 text-white">
            Add table number and Go to
            <span className="text-[#D4AE4C]"> MENU</span>
          </h2>
          <div className="bg-white p-2 md:w-44 w-40 rounded-xl">
            {/* <input className="text-xl w-full outline-none border border "></input> */}
            <DropdownMenu
              array={data?.data}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          {error && <h2 className=" text-red-500">Please Select Table</h2>}
        </div>
      </div>
      <div className="text-right ">
        <button
          onClick={() => {
            if (selected.trim().length > 0 && selected !== "select table") {
              dispatch(setOrderTable(selected));
              navigate("/order-from-menu");
            } else {
              setError(true);
            }
          }}
          className="text-white font-bold "
        >
          Next{" "}
          <FaRightLong
            className="right"
            style={{
              fontWeight: "bold",
              display: "inline-block",
              color: "white",
              margin: "0 0.3rem",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default TableNumberPage;
