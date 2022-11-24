import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addShipments, listShipments } from "../../api/shipments";

interface InitialStateType {
  shipments: any;
  error: boolean;
  isLoading: boolean;
  total: number;
  quantity: number;
}

const initialState: InitialStateType = {
  shipments: [],
  isLoading: false,
  error: false,
  total: 0,
  quantity: 0
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
        toast.success("Tạo phiếu nhập thành công");
        state.isLoading = false;
        state.error = false;
        return;
      } else {
        toast.success("Tạo phiếu nhập không thành công");
      }
    });
  }
});

export default shipmentsSlice;
