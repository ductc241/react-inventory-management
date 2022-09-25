import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  loading: boolean;
  error: string;

  user: {
    email: string;
    id: number;
  };
  isLogging: boolean;
}

const initialState: InitialStateType = {
  loading: false,
  error: "",
  user: {
    email: "",
    id: 0
  },
  isLogging: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = { email: "", id: 0 };
      state.isLogging = false;
    }
  }
});

export default authSlice;
export const { logout } = authSlice.actions;
