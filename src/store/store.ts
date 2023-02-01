import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./reducers/authSlice";
import { createWrapper } from "next-redux-wrapper";

const reducers = combineReducers({
  auth,
});

export function makeStore() {
  const store = configureStore({
    reducer: reducers,
  });
  return store;
}

export const wrapper = createWrapper(makeStore);
