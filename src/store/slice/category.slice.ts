import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, list, read, remove, update } from "../../api/category";
import { ICategory } from './../../types/category.type';



interface ICategoryState {
  category: ICategory | {},
  categorys: ICategory[]
}

const initialState: ICategoryState = {
  category: {},
  categorys: []
}


export const addProduct = createAsyncThunk("product/add", async (product: ICategory) => {
  const res = await add(product)
  return res.data;
})
export const listProducts = createAsyncThunk("product/list", async () => {
  const res = await list()
  return res.data;
})
export const readProduct = createAsyncThunk("product/read", async (id: number) => {
  const res = await read(id)
  return res.data;
})
export const removeProduct = createAsyncThunk("product/remove", async (id: number) => {
  await remove(id);
})
export const updateProduct = createAsyncThunk("product/update", async (product: ICategory) => {
  const res = await update(product);
  return res
})
const categorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.categorys.push(payload as ICategory)
    }),
      build.addCase(listProducts.fulfilled, (state, { payload }) => {
        state.categorys = payload as any
      }),
      build.addCase(readProduct.fulfilled, (state, { payload }) => {
        state.category = payload
      }),
      build.addCase(removeProduct.fulfilled, (state, { payload }) => {
        // state.products = state.products.filter((item) => item._id !== payload.id)
      })
    build.addCase(updateProduct.fulfilled, (state, { payload }) => {
      // const user = action.payload
      state.category = payload as any
      console.log(payload)
    });
  }
})
export default categorySlice.reducer;