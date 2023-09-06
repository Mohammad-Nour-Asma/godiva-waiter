import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { request } from "../hooks/request";

export const getMeals = createAsyncThunk("meals/", async (id) => {
  const response = await fetch(`https://api.godiva.gomaplus.tech/api/v1/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
});

const initialState = {
  meals: [],
  loading: false,
};

const mealSlice = createSlice({
  initialState,
  name: "meals",
  extraReducers: (builder) => {
    builder
      .addCase(getMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeals.fulfilled, (state, action) => {
        state.loading = false;

        state.meals = action.payload;
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default mealSlice.reducer;
