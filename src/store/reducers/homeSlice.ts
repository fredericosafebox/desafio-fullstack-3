import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IHomeSlice {
  view: string;
}

const views = {
  signIn: "SIGNIN",
  signUp: "SIGNUP",
};

const initialState: IHomeSlice = {
  view: "SIGNIN",
};

export const homeSlice = createSlice({
  initialState,
  name: "home",
  reducers: {
    goToSignUp: (state) => {
      state.view = views.signUp;
    },
    goToSignIn: (state) => {
      state.view = views.signIn;
    },
  },
});

export const { goToSignIn, goToSignUp } = homeSlice.actions;
export default homeSlice.reducer;
