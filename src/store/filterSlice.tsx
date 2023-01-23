import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: "",
  reducers: {
    setFilterQuery: (state, action) => {
      return action.payload;
    },
  },
});

export const selectFilter = (state: AppState) => state.filter;

export default filterSlice;
