import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
import surveySlice from './surveySlice';

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  user: userSlice.reducer,
  survey: surveySlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

export function makeStore(){
  return configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
  })
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>

export default store;

export const persistor = persistStore(store);
