import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import surveySlice from "./surveySlice";
import tokenSlice from "./tokenSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import filterSlice from "./filterSlice";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      user: userSlice.reducer,
      survey: surveySlice.reducer,
      token: tokenSlice.reducer,
      filter: filterSlice.reducer,
    })
  ),
  middleware: [thunk],
});
export default store;

export const filterActions = filterSlice.actions;

export type AppState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
