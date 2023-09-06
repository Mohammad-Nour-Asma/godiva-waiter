import axios from "axios";

const client = axios.create({ baseURL: "https://api.godiva.gomaplus.tech/api/v1" });
export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  client.defaults.timeout = 600000;
  const onSuccess = (res) => {
    return res;
  };
  const onError = (err) => {
    return err;
  };
  return client(options).then((res) => res);
};
