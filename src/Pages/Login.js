import React, { useState } from "react";
import fork from "../assets/fork_1046857 1.png";
import login from "../assets/LoginBackground.png";
import user from "../assets/user (2).png";
import lock from "../assets/lock.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/loader/loader";
import { request } from "../hooks/request";
import { useErrorBoundary } from "react-error-boundary";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const handleSubmit = (e) => {
    setLoading(true);
    request({
      url: "/login",
      method: "POST",
      data: {
        email: userEmail,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);

        localStorage.setItem("token", res.data.token);
        navigate("/Orders");
      })
      .catch((err) => {
        setLoading(false);

        setError(err);
      });
  };

  return (
    <div
      className="min-h-screen flex absolute top-0 right-0 left-0 justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="w-screen h-screen bg-gray-200 flex justify-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="bg-white rounded-xl shadow-md sm:w-28 sm:h-28 w-24 h-24 flex flex-col justify-center items-center">
              <img className="w-16 h-16" src={fork} />
              <h2 className="text-center items-center text-[#D4AE4C]">
                GODIVA
              </h2>
            </div>
            <>
              <div className="bg-[#FFFFFF] sm:w-96 xs:w-80 xxs:w-64 rounded-xl">
                <div className="p-4 bg-slate-[#F5F5F5] border-b border-b-[#77481DA1] bg-[#F5F5F5] rounded-t-xl">
                  <h2 className=" font-bold text-xl text-center text-transparent bg-clip-text bg-gradient-to-r from-[#D0B05C]  to-[#77481D]">
                    Waiters Login
                  </h2>
                </div>
                <div className="border-b  flex p-6">
                  <img className="w-5 h-5 mr-2" src={user} />
                  <input
                    onChange={(e) => setUserEmail(e.target.value)}
                    type="email"
                    placeholder="User ID"
                    className="text-xs w-[100%] outline-none"
                  />
                </div>
                <div className="flex p-6">
                  <img className="w-4 h-4 mr-3" src={lock} />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="Password"
                    placeholder="Password"
                    className="text-xs w-[100%] outline-none"
                  />
                </div>
              </div>
              <div className="text-left w-full text-xs ml-4 text-red-600 font-semibold">
                {error && error?.response?.status == 401 ? (
                  <p>
                    Wrong Credentials , <span>please try again</span>
                  </p>
                ) : error ? (
                  <p>
                    {error.message} , <span>please try again</span>
                  </p>
                ) : (
                  ""
                )}
              </div>
              <Link
                onClick={() => {
                  handleSubmit();
                  setError(false);
                }}
                className="bg-gradient-to-r text-center from-[#FFDD83] to-[#D0B05C] sm:w-96 xs:w-80 xxs:w-64 p-3 rounded-xl"
              >
                <button className="text-center text-xl text-white">
                  Login
                </button>
              </Link>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
