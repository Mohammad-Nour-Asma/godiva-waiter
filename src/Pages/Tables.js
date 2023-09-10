import React, { useState } from "react";

import { request } from "../hooks/request";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import Heading from "../Components/Heading";
import Loader from "../Components/loader/loader";
import useFetch from "../hooks/useFetch";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import NourRating from "../Components/NourRating";
import { Box, TextField } from "@mui/material";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: "#e7c66f",
    margin: "0 0.2rem ",
    fontSize: "2rem",
  },
  "& .MuiSvgIcon-root, .MuiSvgIcon-colorError, .MuiSvgIcon-fontSizeMedium, .css-1wxstni-MuiSvgIcon-root ":
    {
      fontSize: "2rem",
    },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const Tables = () => {
  const { loading, data } = useFetch("/tables");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const emptyTable = () => {
    request({ url: `/close-table/${id}`, method: "PATCH" })
      .then((res) => {
        navigate("/Orders");
        setOpen(false);
      })
      .catch((err) => {
        showBoundary(err);
      });
  };

  const [info, setInfo] = useState({
    service_rate: 0,
    order_rate: 0,
    feedback: "",
  });

  const handleRating = (rate) => {
    console.log(rate);
    setInfo({
      ...info,
      order_rate: rate,
    });
  };

  const handleService = (rate) => {
    setInfo({
      ...info,
      service_rate: rate,
    });
  };

  const sendFeedback = (feedback) => {
    let data = {};
    for (let key in feedback) {
      if (feedback[key]) {
        data[key] = feedback[key];
      }
    }

    request({ url: `/order_review/${id}`, method: "PATCH", data })
      .then((res) => {})
      .catch((err) => {
        showBoundary(err);
      });
  };

  return (
    <>
      {open && (
        <div className="popup ">
          <div className="actionbox">
            <div className="mb-3">
              <lable className="block mb-2">Please rate you order</lable>
              <StyledRating
                name="highlight-selected-only"
                defaultValue={0}
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
                onChange={(e, newValue) => {
                  handleRating(newValue);
                }}
              />
            </div>
            <div className="mb-3">
              <lable className="block mb-2">Please rate our service</lable>
              <Rating
                style={{
                  fontSize: "2rem",
                  color: "#e7c66f",
                  borderColor: "white",
                }}
                name="simple-controlled"
                value={info.serviceRate}
                onChange={(event, newValue) => {
                  handleService(newValue);
                }}
              />
            </div>
            <div className="mb-3">
              <lable className="block mb-2">Write us Feedback</lable>
              <Box
                sx={{
                  color: "white",
                }}
              >
                <TextField
                  inputProps={{
                    sx: { color: "white", outline: "white" },
                  }}
                  value={info.feedback}
                  onChange={(e) => {
                    setInfo({ ...info, feedback: e.target.value });
                  }}
                  multiline
                  row={5}
                />
              </Box>
            </div>
            <div className="flex gap-4 mt-5">
              <button
                onClick={() => {
                  emptyTable();
                  sendFeedback(info);
                }}
                className="py-1 px-3 rounded-lg bg-green-500"
              >
                submit
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="py-1 px-3 rounded-lg bg-red-500"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Heading title={"Tables"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="py-5 flex flex-wrap justify-center  gap-6">
          {data?.data?.map((item) => {
            return (
              <div
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

export default Tables;
