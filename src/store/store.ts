import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./reducers/authSlice";
import home from "./reducers/homeSlice";
import { createWrapper } from "next-redux-wrapper";

const reducers = combineReducers({
  auth,
  home,
});

export function makeStore() {
  const store = configureStore({
    reducer: reducers,
  });
  return store;
}

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
