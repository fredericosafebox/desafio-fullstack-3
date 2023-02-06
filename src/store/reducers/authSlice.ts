import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import IAuth, { IContact } from "@/interfaces/IAuth";
import { IProfile } from "@/interfaces/IUser";

const initialState: IAuth = {
  authState: false,
  token: null,
  user: null,
  contacts: [],
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
      state.user = null;
    },
    setUser: (state, action: PayloadAction<IProfile>) => {
      state.user = action.payload;
    },
    setContacts: (state, action: PayloadAction<IContact[]>) => {
      state.contacts = [...action.payload];
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

export const { authenticate, setToken, unauthorize, setUser, setContacts } =
  authSlice.actions;
export default authSlice.reducer;
