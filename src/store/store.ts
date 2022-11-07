import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slice/auth.slice";
import shipmentsSlice from "./slice/shipments";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shipment: shipmentsSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
