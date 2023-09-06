import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import line from "../assets/Line 8.png";
import checkCircle from "../assets/check-circle.png";

const PreparedOrders = () => {
  const arrays = [
    {
      orderID: "12345",
      time: "10:30",
      table: "table 2",
      id: "1",
      state: "Prepared Orders",
      array: [
        {
          name: [
            { name1: "Ice cream terrine" },
            { name1: "Ice cream terrine" },
            { name1: "Ice cream terrine" },
          ],
          Qty: [{ qty: "Qty: 2" }, { qty: "Qty: 2" }, { qty: "Qty: 2" }],
          price: [
            { price1: "20.00 SAR" },
            { price1: "20.00 SAR" },
            { price1: "20.00 SAR" },
          ],
        },
      ],
    },
  ];

  const [Open, setOpen] = useState(false);

  function Opened() {
    setOpen(!Open);
  }
  return (
    <div className="w-full">
      {arrays.map((item, index) => {
        return (
          <div key={index} className="">
            <button
              className={` xs:w-72 xxs:w-64 p-3 relative  ${
                Open ? "rounded-t-lg bg-[#FFDD83]" : "rounded-lg bg-[#4E4E4E]"
              }`}
              type="button"
              onClick={Opened}
            >
              <div
                className={`flex justify-between ${
                  Open ? "text-black" : " text-white"
                }`}
              >
                <div>
                  <h2 className="text-white">Order ID :{item.orderID}</h2>
                  <div className="flex">
                    <img className="w-4 h-4 mt-1" src={checkCircle} />
                    <h2
                      className={`border-b ${
                        Open ? "border-black" : " border-white"
                      }`}
                    >
                      Ready
                    </h2>
                  </div>
                </div>
                <div>
                  <h2 className="text-black w-10">{item.table}</h2>
                </div>
              </div>
              <AiOutlineDown
                className={`w-5 h-5 absolute left-[50%] rounded-full p-1 ${
                  Open ? "rotate-180 bg-white" : "bg-[#A2A2A2]"
                } `}
              />
            </button>
            <ul>
              {Open && (
                <div>
                  {item.array.map((item) => (
                    <li
                      key={index}
                      className="z-50 bg-[#333333] shadow xs:w-72 xxs:w-64  h-40 rounded-b-lg pt-2"
                    >
                      <div class="p-2 text-sm text-gray-700">
                        <div className="flex justify-between text-white">
                          <div>
                            <div>
                              {item.name.map((item) => (
                                <div className="mt-3">{item.name1}</div>
                              ))}
                            </div>
                            {/** <div className='flex mb-2'>
                <img className='h-5' src={line} />
                <h2 className='text-[10px] ml-3'><span className='text-[#FF0027] border-b border-[#FF0027]'>note : </span>Ice cream </h2>
                </div>
                 */}
                          </div>
                          <div className="">
                            {item.Qty.map((item) => (
                              <div className="mt-3">{item.qty}</div>
                            ))}
                          </div>
                          <div className="">
                            {item.price.map((item) => (
                              <div className="mt-3">{item.price1}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <h2 className="text-[12px] text-white border-t  border-[#D0B05C] pt-2 p-1">
                          {" "}
                          <span className="text-[#D0B05C] border-b border-[#D0B05C]">
                            otal :{" "}
                          </span>
                          T108.5SAR
                        </h2>
                      </div>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PreparedOrders;
