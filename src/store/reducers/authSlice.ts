import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import IAuth from "@/interfaces/IAuth";

const initialState: IAuth = {
  authState: false,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authenticate: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
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

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
