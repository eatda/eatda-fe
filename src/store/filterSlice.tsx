import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState: number[] = [];
const filterSlice = createSlice({
  name: "filterSlice",
  initialState: initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    },
    deleteFilter: (state, action) =>
      state.filter((id) => id !== action.payload),
  },
});

export const selectFilter = (state: AppState) => state.filter;
export const { addFilter, deleteFilter } = filterSlice.actions;
export default filterSlice;
