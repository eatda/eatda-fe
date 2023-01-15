import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const userSlice = createSlice({
    name: 'userSlice',
    initialState:{
        isLogged: false,
        useremail: '',
    },
    reducers: {
        login:(state,action) => {
            state.isLogged = true;
            state.useremail = action.payload.useremail;
        },
        logout:(state,action) => {
            state.isLogged = false;
            state.useremail = '';
        }
    }
})

export const selectUser = (state: AppState) => state.user;

export default userSlice;

export const {login, logout} = userSlice.actions;