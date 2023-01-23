import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: "",
  reducers: {
    setFilterQuery: (state, action) => {
      return action.payload;
    },
  },
});

export default filterSlice;
