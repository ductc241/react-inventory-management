import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  user: any;
  token: any;
  error: boolean;
  msg: string;
  isLoading: boolean;
}

const initialState: InitialStateType = {
  user: null,
  token: "",
  error: false,
  msg: "",
  isLoading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      localStorage.clear();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
});

export default authSlice;
export const { logOut } = authSlice.actions;
