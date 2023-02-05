import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import IAuth from "@/interfaces/IAuth";

const initialState: IAuth = {
  authState: false,
  token: null,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authenticate: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    unauthorize: (state) => {
      state.token = null;
      state.authState = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { authenticate, setToken, unauthorize } = authSlice.actions;
export default authSlice.reducer;
