import React, { useState } from "react";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import "./NourRatingCss.css";
const NourRating = () => {
  const [rate, setRate] = useState({ rateValue: 1, position: {}, rotate: 0 });

  const handleRateChange = (e) => {
    const children = e.currentTarget.children;
    let index;

    for (index = 0; index < children.length; index++) {
      const element = children[index];

      if (e.target == element) {
        const position = element.getBoundingClientRect();
        console.log(index);
        setRate({ rateValue: index + 1, position, rotate: rate.rotate + 360 });
        console.log(position);
      }
    }
  };
  console.log(rate);

  return (
    <>
      <div>
        <div
          style={{
            opacity: rate.rateValue / 5 + 0.2,
            display: "inline-block",
            position: "absolute",
            left: rate.position.left,
            top: rate.position.top,
            transition: "0.5s",
            zIndex: "1000",
            transform: `rotate(${rate.rotate}deg)`,

            backdropFilter: "blure(10px)",
          }}
        >
          <StarRoundedIcon
            sx={{
              color: "gold",
            }}
            fontSize="large"
          />
        </div>
        <div
          onClick={handleRateChange}
          style={{
            display: "inline-block",
            position: "relative",
            color: "white",
          }}
        >
          <StarOutlineRoundedIcon
            className={rate.rateValue >= 1 ? "bump rotate" : ""}
            style={{
              cursor: "pointer",
              color: rate.rateValue >= 1 ? "gold" : "white",
              transition: "0.8s",
            }}
            fontSize="large"
          />
          <StarOutlineRoundedIcon
            className={rate.rateValue > 1 ? "bump rotate" : ""}
            style={{
              cursor: "pointer",
              color: rate.rateValue > 1 ? "gold" : "white",
              transition: "0.8s",
            }}
            fontSize="large"
          />
          <StarOutlineRoundedIcon
            className={rate.rateValue > 2 ? "bump rotate" : ""}
            style={{
              cursor: "pointer",
              color: rate.rateValue > 2 ? "gold" : "white",
              transition: "0.8s",
            }}
            fontSize="large"
          />
          <StarOutlineRoundedIcon
            className={rate.rateValue > 3 ? "bump rotate" : ""}
            style={{
              cursor: "pointer",
              color: rate.rateValue > 3 ? "gold" : "white",
              transition: "0.8s",
            }}
            fontSize="large"
          />
          <StarOutlineRoundedIcon
            className={rate.rateValue > 4 ? "bump rotate" : ""}
            style={{
              cursor: "pointer",
              color: rate.rateValue > 4 ? "gold" : "white",
              transition: "0.8s",
            }}
            fontSize="large"
          />
        </div>
      </div>
    </>
  );
};

export default NourRating;
