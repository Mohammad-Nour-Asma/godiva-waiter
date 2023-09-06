import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  tableId: "",
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const Exis = state.cartItems.find((item) => item.id == action.payload.id);
      if (!Exis) {
        let arr = state.cartItems;
        arr.push(action.payload);
        state.cartItems = arr;
      }
    },

    calculateMeals: (state) => {
      let mealsNum = 0;
      state.cartItems.forEach((element) => {
        mealsNum += element.amount;
      });
      state.total = mealsNum;
    },

    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => +item.id == +payload);
      cartItem.amount = cartItem.amount - 1;
    },

    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => +item.id == +payload);

      cartItem.amount = cartItem.amount + 1;
    },

    setOrderTable: (state, { payload }) => {
      state.tableId = payload;
    },

    setMealNote: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id == payload.id);
      cartItem.note = payload.note;
    },

    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.tableId = "";
    },
    emptyCart: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  addToCart,
  calculateMeals,
  decrease,
  increase,
  setOrderTable,
  setMealNote,
  removeItem,
  clearCart,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
