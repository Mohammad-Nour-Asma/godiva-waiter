import React, { useEffect, useState } from "react";

const Timer = ({ estimatedTime, create_at }) => {
  const [timeLeft, setTimeLeft] = useState(estimatedTime);

  // set the timer to its previous state
  useEffect(() => {
    const create = new Date(create_at);
    const now = new Date();

    const createHour = create.getHours();
    const createMinut = create.getMinutes();
    const createSecond = create.getSeconds();

    const nowDay = now.getDay();

    now.setHours(now.getHours() - createHour);
    now.setMinutes(now.getMinutes() - createMinut);
    now.setSeconds(now.getSeconds() - createSecond);

    const diffHours = now.getHours();
    const diffMinuts = now.getMinutes();
    const diffSecond = now.getSeconds();

    console.log(diffHours, diffMinuts, diffSecond, "Debaug");
    // Estimated Time
    const estimatedArr = estimatedTime.split(":");
    const estimated = new Date();
    estimated.setHours(estimatedArr[0], estimatedArr[1], estimatedArr[2]);
    const day = estimated.getDay();
    console.log(nowDay, now.getDay());
    if (nowDay === now.getDate) {
      estimated.setSeconds(estimated.getSeconds() - diffSecond);
      estimated.setMinutes(estimated.getMinutes() - diffMinuts);
      estimated.setHours(estimated.getHours() - diffHours);
    }
    if (estimated.getDay() === day) {
      const startFrom = `${estimated.getHours()}:${estimated.getMinutes()}:${estimated.getSeconds()}`;

      setTimeLeft(startFrom);
    } else {
      setTimeLeft("00:00:00");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const [hours, minutes, seconds] = timeLeft.split(":");
      let secondsLeft =
        Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

      if (secondsLeft > 0) {
        secondsLeft--;
        const formattedTimeLeft = [
          Math.floor(secondsLeft / 3600),
          Math.floor((secondsLeft % 3600) / 60),
          secondsLeft % 60,
        ]
          .map((v) => String(v).padStart(2, "0"))
          .join(":");

        setTimeLeft(formattedTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <span
      style={{
        textDecoration: "underline",
        color: timeLeft == "00:00:00" ? "rgb(43, 191, 102)" : "",
      }}
    >
      {timeLeft}
    </span>
  );
};

export default Timer;
