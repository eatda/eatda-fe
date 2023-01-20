import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const surveySlice = createSlice({
    name: 'surveySlice',
    initialState:{
        height: -1,
        weight: -1,
        age: -1,
        gender: null,
        activity: null,
        allergy: null
    },
    reducers: {
        putSurvey:(state,action) => {
            state.height = action.payload.height;
            state.weight = action.payload.weight;
            state.age = action.payload.age;
            state.gender = action.payload.gender;
            state.activity = action.payload.activity;
            state.allergy = action.payload.allergy;
        },
        delSurvey:(state, action) =>{
            state.height = -1;
            state.weight = -1;
            state.age = -1;
            state.gender = null;
            state.activity = null;
            state.allergy = null;
        }
    }
})

export const selectSurvey = (state: AppState) => state.survey;

export default surveySlice;

export const {putSurvey, delSurvey} = surveySlice.actions;