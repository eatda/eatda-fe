import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const teamSlice = createSlice({
    name: 'teamSlice',
    initialState:{
        teamDiabetes: false
    },
    reducers: {
        checkTeamDia: (state,action) => {
            state.teamDiabetes = action.payload.teamDiabetes;
        }    
    }
})

export const selectTeam = (state: AppState) => state.team;

export default teamSlice;

export const {checkTeamDia} = teamSlice.actions;