import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IHomeSlice {
  view: string;
  modalContact: boolean;
  modalProfile: boolean;
  modalContactEdit: boolean;
  selectedContact: number;
}

const views = {
  signIn: "SIGNIN",
  signUp: "SIGNUP",
};

const initialState: IHomeSlice = {
  view: "SIGNIN",
  modalContact: false,
  modalProfile: false,
  modalContactEdit: false,
  selectedContact: 0,
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
    manageProfileModal: (state, action: PayloadAction<boolean>) => {
      state.modalProfile = action.payload;
    },
    manageContactModal: (state, action: PayloadAction<boolean>) => {
      state.modalContact = action.payload;
    },
    editContact: (state, action: PayloadAction<boolean>) => {
      state.modalContactEdit = action.payload;
    },
    selectContact: (state, action: PayloadAction<number>) => {
      state.selectedContact = action.payload;
    },
  },
});

export const {
  goToSignIn,
  goToSignUp,
  manageContactModal,
  manageProfileModal,
  editContact,
  selectContact,
} = homeSlice.actions;
export default homeSlice.reducer;
