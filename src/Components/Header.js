import React, { useState, useEffect, useRef } from "react";
import { BsBell } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications } from "../Features/NotificationSlice";

const Header = () => {
  const location = useLocation();
  const [openNotification, setOpenNotification] = useState(false);
  const { readyOrders } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const notificationRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        console.log("hellow workd");
        setOpenNotification(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className="w-full bg-[#343232] p-5 shadow-sm shadow-black">
      <div className="flex flex-row-reverse container justify-between">
        <div className="flex items-center flex-row gap-5">
          <Link
            to="/tables"
            style={{
              transition: "0.3s",
            }}
            className={`relative cursor-pointer   ${
              location.pathname === "/tables"
                ? "text-[#D0B05C] "
                : "text-[#BCBCBC] sm:text-base xxs:text-[10px]"
            }`}
          >
            Tables
          </Link>
          <Link
            to="/Orders"
            style={{
              transition: "0.3s",
            }}
            className={`relative cursor-pointer   ${
              location.pathname === "/Orders"
                ? "text-[#D0B05C] "
                : "text-[#BCBCBC] sm:text-base xxs:text-[10px]"
            }`}
          >
            Orders
          </Link>
          <Link
            to={"/add-order"}
            style={{
              transition: "0.3s",
            }}
            className={`relative cursor-pointer  ${
              location.pathname === "/add-order"
                ? "text-[#D0B05C]"
                : "text-[#BCBCBC] sm:text-base xxs:text-[10px]"
            }`}
          >
            Add Order
          </Link>
          <Link
            to={"/menu"}
            style={{
              transition: "0.3s",
            }}
            className={`relative cursor-pointer  ${
              location.pathname === "/menu"
                ? "text-[#D0B05C] "
                : "text-[#BCBCBC] sm:text-base xxs:text-xs"
            }`}
          >
            Menu
          </Link>
          <Link
            to={"/"}
            style={{
              transition: "0.3s",
            }}
            onClick={() => {
              localStorage.clear();
            }}
            className={`relative cursor-pointer  ${"text-[#BCBCBC] sm:text-base xxs:text-xs"}`}
          >
            Logout
          </Link>
        </div>
        <div
          style={{
            borderRadius: "30%",
          }}
          className="color-[#565656] relative text-lg bg-[#565656;] flex items-center  w-8  h-8 "
        >
          <BsBell
            ref={notificationRef}
            className="cursor-pointer"
            style={{
              textAlign: "center",
              margin: "0 auto",
            }}
            onClick={(e, reason) => {
              setOpenNotification(!openNotification);
            }}
            onClose={(e, reason) => {
              console.log(e, reason);
            }}
          />
          {readyOrders?.length > 0 && <div className="circle"></div>}
          <div
            style={{
              maxHeight: "350px",
              overflowY: "auto",
            }}
            className={`absolute  bg-white rounded-lg text-xs notification ${
              openNotification ? "openNotification" : ""
            }`}
          >
            {readyOrders?.map((item, index) => {
              if (item.message) {
                return (
                  <div
                    key={index}
                    className="flex rounded-lg bg-sky-200 gap-5 my-3"
                  >
                    <span className="text-green-600">
                      <IoMdCheckmarkCircleOutline />
                    </span>
                    <span className="font-semibold">{item.text}</span>
                  </div>
                );
              }
              if (item.minutes) {
                return (
                  <div
                    key={index}
                    className="flex rounded-lg bg-red-200 gap-5 my-3"
                  >
                    <span className="text-green-600">
                      <IoMdCheckmarkCircleOutline />
                    </span>
                    <span>
                      Table Number{" "}
                      <span className="underline   font-bold">
                        {item[0].relationship.table.table_number}
                      </span>{" "}
                      has been 30 minutes from last order
                    </span>
                  </div>
                );
              }
              if (item.isGoing) {
                return (
                  <div
                    key={index}
                    className="flex rounded-lg bg-yellow-200 gap-5 my-3"
                  >
                    <span className="text-green-600">
                      <IoMdCheckmarkCircleOutline />
                    </span>
                    <span>
                      start preparing order table's
                      <span className="underline pl-2 font-bold">
                        {item[0].relationship.table.table_number}
                      </span>{" "}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="flex  rounded-lg bg-green-200 gap-5 my-3"
                >
                  <span className="text-green-600">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  <span>
                    Table Number{" "}
                    <span className="underline font-bold pl-2">
                      {item[0].relationship.table.table_number}
                    </span>{" "}
                    Order's
                  </span>
                  <span className="text-green-600">Ready</span>
                </div>
              );
            })}
            {readyOrders?.length > 0 ? (
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => {
                    setOpenNotification(false);
                    dispatch(clearNotifications());
                  }}
                  className="text-white  bg-red-500 font-semibold text-xs outline-none  py-1 px-2 rounded-md"
                >
                  clear notifications
                </button>
              </div>
            ) : (
              <p className="p-3 flex justify-center"> No Notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
