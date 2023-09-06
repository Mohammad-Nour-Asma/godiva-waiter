import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/CartSlice";
import MealsReducer from "./Features/MealsSlice";
import NotificationReducer from "./Features/NotificationSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    meals: MealsReducer,
    notification: NotificationReducer,
  },
});
