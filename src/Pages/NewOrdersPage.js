import React, { useEffect, useRef, useState } from "react";
import Order from "../Components/Order";
import { request } from "../hooks/request";
import Loader from "../Components/loader/loader";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import {
  add30minuteNotification,
  addNotification,
  addOnGoingNotification,
} from "../Features/NotificationSlice";
import { useErrorBoundary } from "react-error-boundary";

const NewOrdersPage = () => {
  const [toggleState, setToggleState] = useState(2);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ data: [] });
  const dispatch = useDispatch();
  const toggleStateRef = useRef();
  const dataRef = useRef();
  dataRef.current = data;
  toggleStateRef.current = toggleState;

  const { showBoundary } = useErrorBoundary();

  const toggleTap = (index) => {
    setToggleState(index);
  };

  //get orders
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = (e) => {
    setLoading(true);
    request({
      url: `orders?state=${toggleState}`,
      method: "GET",
    })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);

        showBoundary(err);
      });
  };

  // 30 minute note realtime
  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("order30MinutesAgo");

    channel.bind("order-from-30-minutes", (data1) => {
      dispatch(add30minuteNotification(data1.order));
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  // Ongoing Orders realtime
  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("onGoingOrders");

    channel.bind("one-order-start-preparing", (data1) => {
      if (toggleStateRef.current == 2) {
        data1.order[0].newOrder = true;
        setData((prev) => {
          return { data: [data1?.order[0], ...prev.data] };
        });
      }
      dispatch(addOnGoingNotification(data1.order));
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  // Ready Orders realtime
  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("readyToDeliver");

    channel.bind("order-ready-to-deliver", (data1) => {
      if (toggleStateRef.current == 3) {
        data1.order[0].newOrder = true;

        setData((prev) => {
          return { data: [data1?.order[0], ...prev.data] };
        });
      } else {
        let filter = false;

        for (let i = 0; i < dataRef.current.data.length; i++) {
          if (dataRef.current.data[i].id == data1?.order[0].id) {
            filter = true;
            break;
          }
        }

        if (filter) {
          setData((prev) => {
            const newArray = dataRef.current.data.filter(
              (item) => item.id !== data1.order[0].id
            );

            return { data: newArray };
          });
        }
        dispatch(addNotification(data1.order));
      }
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    getOrders();
  }, [toggleState]);

  return (
    <div className=" pt-10 min-h-screen bg-[#232323]">
      <div
        style={{
          transition: "0.3s",
          borderRadius: "10px",
        }}
        className="flex justify-center items-center  mb-10"
      >
        <div
          style={{
            borderRadius: "10px",
          }}
          className="flex justify-end bg-white"
        >
          <div className="">
            <button
              style={{
                transition: "0.3s",
                borderRadius: "10px",
              }}
              className={
                toggleState == 2
                  ? " text-[#FFFFFF] bg-gradient-to-r from-[#FFDD83] to-[#D0B05C]   p-1 flex justify-center xxs:w-32 xs:w-40 rounded-l-sm"
                  : " text-[#8E8E8E] bg-[#FFFFFF]  p-1 flex justify-center  xxs:w-32  xs:w-40  rounded-l-sm"
              }
              onClick={() => {
                toggleTap(2);
              }}
            >
              <h1 className="text-sm p-1">Ongoing Orders</h1>
            </button>
          </div>
          <div>
            <button
              style={{
                transition: "0.3s",
                borderRadius: "10px",
              }}
              className={
                toggleState == 3
                  ? "  text-[#FFFFFF] bg-gradient-to-r from-[#FFDD83] to-[#D0B05C]   p-1 flex justify-center  xxs:w-32 xs:w-40 rounded-r-sm w-full"
                  : " text-[#8E8E8E] bg-[#FFFFFF]  p-1 flex justify-center xxs:w-32  xs:w-40  rounded-r-sm "
              }
              onClick={() => {
                toggleTap(3);
              }}
            >
              <h1 className="text-sm p-1">Prepared Orders</h1>
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : data?.data?.length === 0 ? (
        <h1 className="text-center text-lg text-[#D0B05C] font-bold">
          No Orders Found
        </h1>
      ) : (
        <div className="flex justify-center items-center">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 w-full ">
            {data?.data?.map((item) => {
              return (
                <Order order={[item]} key={item.id} ready={toggleState === 3} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrdersPage;
