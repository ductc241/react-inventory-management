import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addShipments,
  deleteShipment,
  getOneShipment,
  listShipments
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

export const addShipmentsThunks = createAsyncThunk(
  "shipment/addShipmentsThunks",
  async (dataShipments: any) => {
    await addShipments(dataShipments);
    return dataShipments;
  }
);

export const deleteShipmentsThunk = createAsyncThunk(
  "shipment/removeShipmentsThunk",
  async (id: any) => {
    await deleteShipment(id);
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
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(deleteShipmentsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
    });
  }
});

export default shipmentsSlice;
