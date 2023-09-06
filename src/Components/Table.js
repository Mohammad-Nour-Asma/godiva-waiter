import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Heading from "./Heading";
import Loader from "./loader/loader";
import { request } from "../hooks/request";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

const Table = () => {
  const { loading, data } = useFetch("/tables");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const { showBoundary } = useErrorBoundary();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emptyTable = () => {
    setIsLoading(true);
    request({ url: `/close-table/${id}`, method: "PATCH" })
      .then((res) => {
        setIsLoading(false);
        navigate("/Orders");
        setOpen(false);
      })
      .catch((err) => {
        setIsLoading(false);

        showBoundary(err);
      });
  };
  return (
    <>
      {open && (
        <div className="popup">
          <div className="actionbox">
            <p>Are you sure of this action ?</p>
            <div className="flex gap-4 mt-5">
              <button
                onClick={() => {
                  emptyTable();
                }}
                className="py-1 px-3 rounded-lg bg-green-500"
              >
                yes
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="py-1 px-3 rounded-lg bg-red-500"
              >
                no
              </button>
            </div>
          </div>
        </div>
      )}
      <Heading title={"Tables"} />
      {loading || isLoading ? (
        <Loader />
      ) : (
        <div className="py-5 flex flex-wrap justify-center  gap-6">
          {data?.data?.map((item) => {
            return (
              <div
                key={item.id}
                className={`w-[14%] text-center h-12 flex items-center justify-center rounded  text-black-700 font-semibold ${
                  item.in_progress
                    ? "bg-red-600 text-white cursor-pointer"
                    : "bg-gray-500"
                }`}
                onClick={() => {
                  if (item.in_progress) {
                    setOpen(true);
                    setId(item.id);
                  }
                }}
              >
                {item?.table_number}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Table;
