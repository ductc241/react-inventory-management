import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getOneShipment,
  listShipments,
  updateShipments
} from "../../api/shipments";

interface InitialStateType {
  shipments: any;
  shipment: any;
  error: boolean;
  isLoading: boolean;
  total: number;
  quantity: number;
}

const initialState: InitialStateType = {
  shipments: [],
  shipment: "",
  isLoading: false,
  error: false,
  total: 0,
  quantity: 0
};

export const getShipmentThunk = createAsyncThunk(
  "shipment/getShipmentThunk",
  async () => {
    const { data } = await listShipments();
    return data;
  }
);

export const getOneShipmentThunk = createAsyncThunk(
  "shipment/getOneShipmentThunk",
  async (id: number | string) => {
    const { data } = await getOneShipment(id);
    return data;
  }
);

export const updateShipmentsThuck = createAsyncThunk(
  "shipment/updateShipmentsThuck",
  async (id: number | string | undefined) => {
    const { data } = await updateShipments(id);
    return data;
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
    builder.addCase(getOneShipmentThunk.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.error = false;
      state.shipment = state.shipments.find(
        (item: any) => item.id === action.payload.id
      );
    });
    builder.addCase(
      updateShipmentsThuck.fulfilled,
      (state: any, action: any) => {
        state.isLoading = false;
        state.error = false;
        state.shipments = action.payload;
      }
    );
  }
});

export default shipmentsSlice;
