import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const userSlice = createSlice({
    name: 'userSlice',
    initialState:{
        isLogged: false,
        usersocial_id: '',
        useremail: '',
        username: '',
        usercharacter: -1,
        isDiabetes: null,
        group_id: -1,

    },
    reducers: {
        login:(state,action) => {
            state.isLogged = true;
            state.usersocial_id = action.payload.usersocial_id;
            state.useremail = action.payload.useremail;
            state.username = action.payload.username;
            state.usercharacter = action.payload.usercharacter;
            state.isDiabetes = action.payload.isDiabetes;
            state.group_id = action.payload.group_id;
        },
        logout:(state,action) => {
            state.isLogged = false;
            state.usersocial_id = '';
            state.useremail = '';
            state.username = '';
            state.usercharacter = -1;
            state.isDiabetes = null;
            state.group_id = -1;
        }
    }
})

export const selectUser = (state: AppState) => state.user;

export default userSlice;

export const {login, logout} = userSlice.actions;