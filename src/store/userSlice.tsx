import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const userSlice = createSlice({
    name: 'userSlice',
    initialState:{
        isLogged: false,
        useremail: '',
        username: '',
        group_id: -1,

    },
    reducers: {
        login:(state,action) => {
            state.isLogged = true;
            state.useremail = action.payload.useremail;
            state.username = action.payload.username;
            state.group_id = action.payload.group_id;
        },
        logout:(state,action) => {
            state.isLogged = false;
            state.useremail = '';
            state.username = '';
            state.group_id = -1;
        }
    }
})

export const selectUser = (state: AppState) => state.user;

export default userSlice;

export const {login, logout} = userSlice.actions;