import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Components/CartItem";
import { request } from "../hooks/request";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Features/CartSlice";
import Loader from "../Components/loader/loader";
import { useErrorBoundary } from "react-error-boundary";
import {
  addNotification,
  addNotificationMessage,
} from "../Features/NotificationSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showBoundary } = useErrorBoundary();

  if (cart.cartItems.length === 0) {
    return (
      <div className="bg-[#4a4a4a] sm:w-[50%] mx-auto text-sm p-4 rounded">
        <h1 className="text-white my-3 text-[#d8b863] text-center color text-xl">
          Cart Is Empty
        </h1>
      </div>
    );
  }

  const sendOrder = () => {
    setLoading(true);
    const order_items = cart.cartItems.map((item) => {
      return { quantity: item.amount, meal_id: item.id, note: item.note };
    });
    const order = {
      table_number: cart.tableId,
      order_items,
    };

    request({ url: "add_order_to_table", method: "POST", data: order })
      .then((resp) => {
        setLoading(false);
        navigate("/Orders");
        dispatch(clearCart());
        dispatch(
          addNotificationMessage({
            text: `Table number ${order.table_number} has been reserved`,
          })
        );
      })
      .catch((err) => {
        setLoading(false);

        showBoundary(err);
      });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <h1 className="text-white my-3 text-center text-xl">
            Table Number{" "}
            <span className="text-bold text-xl  underline text-[#d8b863]">
              {cart.tableId}
            </span>{" "}
            order details
          </h1>
          <div
            style={{ maxHeight: "500px", overflowY: "auto" }}
            className="bg-[#4a4a4a] sm:w-[50%]  mx-auto text-sm p-4 rounded"
          >
            {cart.cartItems.map((item) => {
              return (
                <CartItem
                  title={item.name}
                  price={item.price}
                  type={item.note}
                  amount={item.amount}
                  id={item.id}
                  key={item.id}
                  img={item.image}
                />
              );
            })}
          </div>
          <div className="mx-auto w-fit px-4 py-2 bg-[#d8b863] my-5 rounded-lg">
            <button
              onClick={sendOrder}
              style={{ color: "white" }}
              className="font-bold"
            >
              Order Now
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
