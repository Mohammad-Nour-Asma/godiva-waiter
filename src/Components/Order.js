import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import MealItem from "./MealItem";
import Timer from "./Timer";

const Order = ({ ready, order }) => {
  const [Open, setOpen] = useState(false);

  function Opened() {
    setOpen(!Open);
  }

  return (
    <div
      style={{
        border: "1px solid transparent",
        borderColor: Open ? " #eece7b" : "transparent",
        transition: "0.5s",
        borderRadius: "10px",
      }}
    >
      {order.map((item, index) => {
        return (
          <div key={index} className="">
            <button
              className={` ${
                item.newOrder ? "bg-green-600" : "bg-[#4E4E4E] "
              } xs:w-72 xxs:w-64  relative outline-none ${
                Open ? "rounded-t-lg" : "rounded-lg"
              }`}
              type="button"
              style={{
                width: "100%",
              }}
              onClick={Opened}
            >
              <div className="flex p-2 justify-between items-center gap-2">
                <div>
                  <h2 className="text-white  text-left">
                    Order ID :{item.order_id}
                  </h2>
                  {ready ? (
                    <div className=" text-left">
                      <BsCheck2Circle
                        style={{ color: "#2bbf66 ", display: "inline-block" }}
                      />{" "}
                      <span className="underline text-white text-xs">
                        Ready
                      </span>
                    </div>
                  ) : (
                    <div className="flex text-sm items-center gap-1">
                      <GoClock
                        style={{
                          color: "#eece7b",
                        }}
                      />
                      <h2 className="text-white ">
                        <span className="border-b mr-1">
                          <Timer
                            create_at={item.updated_at}
                            estimatedTime={item.estimated_time}
                          />
                        </span>
                        <span className="text-[#CECECE] text-xs">
                          {" "}
                          Till Ready
                        </span>
                      </h2>
                    </div>
                  )}
                </div>

                <div
                  className="p-2"
                  style={{
                    background: ready ? "#f7d57c" : "",
                    borderRadius: "7px",
                    color: ready ? "#232323" : "white",
                  }}
                >
                  <h2 className="  w-10">
                    <span className="block">Table</span>
                    <span className="font-bold">
                      {item.relationship.table.table_number}
                    </span>
                  </h2>
                </div>
              </div>
              <AiOutlineDown
                style={{
                  transition: "0.5s",
                }}
                className={`w-5 h-5 absolute bottom-[-7%] left-[45%] rounded-full p-1  ${
                  Open
                    ? "rotate-180 bg-gradient-to-r from-[#FFDD83] to-[#D0B05C]"
                    : "bg-[#A2A2A2]"
                } `}
              />
            </button>
            <div
              style={{
                transition: "max-height 0.4s ",
                maxHeight: Open ? "500px" : "0", // Adjust "500px" to a value that suits your content
                overflow: "hidden",
                borderRadius: "10px",
              }}
              className={` overflow-hidden z-50 bg-[#333333] shadow `}
            >
              {item.relationship.order_items.map((subOrder) => {
                return (
                  <MealItem
                    name={subOrder.relationships.meal.name}
                    qty={subOrder.quantity}
                    total={subOrder.total}
                    note={subOrder.note}
                  />
                );
              })}
              <div className="flex items-center p-3  justify-between">
                {ready && (
                  <div>
                    <button className="text-white rounded bg-green-500 hover:bg-green-700 transition-all py-1 px-4 text-sm">
                      Ready
                    </button>
                  </div>
                )}
                <div
                  style={{
                    borderTop: "1px solid #eece7b ",
                  }}
                  className="text-white  w-fit ml-auto"
                >
                  <span>Total : </span>
                  <span>{item.total} SAR </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
