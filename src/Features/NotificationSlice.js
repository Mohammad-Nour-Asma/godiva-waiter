import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readyOrders: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      let arr = state.readyOrders;
      arr.push(payload);
      state.readyOrders = arr;
    },

    addOnGoingNotification: (state, { payload }) => {
      let arr = state.readyOrders;
      arr.push({ ...payload, isGoing: true });
      state.readyOrders = arr;
    },

    add30minuteNotification: (state, { payload }) => {
      let arr = state.readyOrders;
      arr.push({ ...payload, minutes: true });
      state.readyOrders = arr;
    },

    clearNotifications: (state) => {
      state.readyOrders = [];
    },
    addNotificationMessage: (state, { payload }) => {
      let arr = state.readyOrders;
      arr.push({ ...payload, message: true });
      state.readyOrders = arr;
    },
  },
});

export default notificationSlice.reducer;
export const {
  addNotification,
  clearNotifications,
  addOnGoingNotification,
  add30minuteNotification,
  addNotificationMessage,
} = notificationSlice.actions;
