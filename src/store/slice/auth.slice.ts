import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../../api/login.api";
import { UserType } from "../../types/user.type";
import { toast } from "react-toastify";

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

export const signIn = createAsyncThunk("signIn", async (user: UserType) => {
  const { data } = await signin(user);
  return data;
});

export const signUp = createAsyncThunk("signUp", async (user: UserType) => {
  await signup(user);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      state.token = localStorage.setItem(
        "token",
        JSON.stringify(payload.accessToken)
      );
      toast.success("Đăng nhập thành công!");
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = true;
      state.error = true;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      toast.success("Đăng ký thành công!");
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = true;
      state.error = true;
      toast.error("Lỗi");
    });
  }
});

export default authSlice;
export const { logOut } = authSlice.actions;
