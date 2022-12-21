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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
});

export default authSlice;
export const { logOut } = authSlice.actions;
