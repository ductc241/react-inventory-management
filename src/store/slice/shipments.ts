/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addShipments, listShipments } from "../../api/shipments";

export enum IStatus {
  DISPLAY,
  IMPORT
}
interface InitialStateType {
  shipments: any;
  error: boolean;
  isLoading: boolean;
  total: number;
  quantity: number;
  status: IStatus;
}

const initialState: InitialStateType = {
  shipments: [],
  isLoading: false,
  error: false,
  total: 0,
  quantity: 0,
  status: IStatus.DISPLAY
};

export const getShipmentThunk = createAsyncThunk(
  "shipment/getShipmentThunk",
  async () => {
    const res = await listShipments();
    return res;
  }
);

export const addShipmentsThunks = createAsyncThunk(
  "shipment/addShipmentsThunks",
  async (dataShipments: any) => {
    const res = await addShipments(dataShipments);
    return res;
  }
);

const shipmentsSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getShipmentThunk.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.error = false;
      state.shipments = action.payload;
    });
    builder.addCase(addShipmentsThunks.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.isLoading = false;
        state.error = false;
        state.status = IStatus.IMPORT;
        toast.success("Tạo phiếu nhập thành công");
        return;
      } else {
        toast.error("Tạo phiếu nhập không thành công");
      }
    });
  }
});

export default shipmentsSlice;
