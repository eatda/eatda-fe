import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState:{
        access_token: ''
    },
    reducers: {
        putToken: (state,action) => {
            state.access_token = action.payload.access_token;
        },
        delToken: (state,action) => {
            state.access_token = '';
        }
    }
})

export const selectToken = (state: AppState) => state.token;

export default tokenSlice;

export const {putToken, delToken} = tokenSlice.actions;