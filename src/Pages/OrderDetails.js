import React from "react";
import arrow from "../assets/arrow-left (2).png";
import item1 from "../assets/60e5cb13ad04234936260744-optimized 1.png";
import item2 from "../assets/60e5c6caad0423493625ff35-optimized (1).png";
import item3 from "../assets/60e5c6c9a3dd51784e3e0bd1-optimized.png";


const OrderDetails = () => {
  const arr = [
    { name: "Milk Sin Cake New", image: item1, price: "20.15 SR", id: "1" },
    { name: "Tourbillon Brownie", image: item2, price: "20.15 SR", id: "2" },
    { name: "Sliced Carrot Cake", image: item3, price: "20.15 SR", id: "3" },
  ];

  return (
    <div className="w-screen min-h-screen bg-[#232323] p-5">
      <div className="flex">
        <img className="w-5 h-5 mt-1" src={arrow} />
        <h2 className="text-[#CECECF]">Back</h2>
      </div>
      <div className="p-4">
        <h2 className="text-2xl text-white">
          Table Number{" "}
          <span className="text-[#FFDD83] border-b border-[#FFDD83]">3</span>{" "}
          order details
        </h2>
        <div className="bg-[#4A4A4A] p-5 pt-14 pb-8  mt-5 rounded-xl">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
            {arr.map((item, index) => {
              return (
                <div key={index} className="relative">
                  <div className="bg-[#FFC8D0] w-6 h-6 absolute top-[45%] right-[98%] text-center rounded-md text-sm">
                    4
                  </div>
                  <div
                    key={index}
                    className=" p-3 border border-white rounded-xl bg-white"
                  >
                    <div className="flex justify-between">
                      <div className=" flex">
                        <div>
                          <img
                            className="xs:w-24 xxs:w-20 mr-2"
                            src={item.image}
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <h2 className=" xxs:text-xs font-bold md:text-base">
                            {" "}
                            {item.name}
                          </h2>
                          <h2 className=" text-[#950A1F] text-[10px] font-bold">
                            {item.price}
                          </h2>
                        </div>
                      </div>
                      <h2 className="text-[#00A8DD] sm:text-base xxs:text-[12px]">
                        x2
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="bg-gradient-to-r from-[#FFDD83] to-[#D0B05C] mt-4 p-2 rounded-lg xxs:w-full sm:w-[30%]">
            <h2 className="text-[#FCFCFC] text-center font-semibold">
              Send Request
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
