import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/auth.slice";
import categorySlice from "./slice/category.slice";
import orderSlice from "./slice/order.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice,
    order: orderSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
