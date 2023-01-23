import { configureStore, createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: "",
  reducers: {
    setFilterQuery: (state, filterQuery) => {
      state = filterQuery.payload;
    },
  },
});

export default filterSlice;
