import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, list, get, remove, update } from "../../api/category";
import { ICategory } from './../../types/category.type';



interface ICategoryState {
  category: ICategory | {},
  categorys: ICategory[]
}

const initialState: ICategoryState = {
  category: {},
  categorys: []
}


export const addCategory = createAsyncThunk("category/add", async (category: ICategory) => {
  const res = await add(category)
  return res.data;
})
export const listCategory = createAsyncThunk("category/list", async () => {
  const res = await list()
  return res.data;
})
export const readCategory = createAsyncThunk("category/read", async (id: number) => {
  const res = await get(id)
  return res.data;
})
export const removeCategory = createAsyncThunk("category/remove", async (id: number) => {
  await remove(id);
})
export const updateCategory = createAsyncThunk("category/update", async (category: ICategory) => {
  const res = await update(category);
  return res
})
const categorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.categorys.push(payload as ICategory)
    }),
      build.addCase(listCategory.fulfilled, (state, { payload }) => {
        state.categorys = payload as any
      }),
      build.addCase(readCategory.fulfilled, (state, { payload }) => {
        state.category = payload
      }),
      build.addCase(removeCategory.fulfilled, (state, { payload }) => {
        // state.products = state.products.filter((item) => item._id !== payload.id)
      })
    build.addCase(updateCategory.fulfilled, (state, { payload }) => {
      // const user = action.payload
      state.category = payload as any
      console.log(payload)
    });
  }
})
export default categorySlice.reducer;