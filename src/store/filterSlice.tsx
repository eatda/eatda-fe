import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";

// 유저가 선택한 필터 정보 관리
const initialState: number[] = [];
export const filterSlice = createSlice({
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

// 필터 쿼리스트링 관리
export const filterQuerySlice = createSlice({
  name: "filterQuerySlice",
  initialState: "",
  reducers: {
    setFilterQuery: (state, action) => action.payload,
  },
});
export const selectFilterQuery = (state: AppState) => state.filterQuery;
export const { setFilterQuery } = filterQuerySlice.actions;
