import { useEffect, useState } from "react";
import { request } from "./request";
import { useErrorBoundary } from "react-error-boundary";

const useFetch = (url) => {
  const [info, setInfo] = useState({
    data: [],
    loading: true,
  });
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchData = async () => {
      request({
        url: url,
        method: "GET",
      })
        .then((res) => {
          setInfo({ loading: false, data: res.data });
        })
        .catch((err) => {
          setInfo({ loading: false });
          showBoundary(err);
        });
    };

    fetchData();
  }, []);

  return info;
};

export default useFetch;
