import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCategoryAPI,
  updateCategoryAPI,
  removeCategoryAPI,
  getCategoryAPI,
  listCategoryAPI
} from "../../api/category";
import { ICategory } from "./../../types/category.type";

interface ICategoryState {
  // eslint-disable-next-line @typescript-eslint/ban-types
  category: ICategory | {};
  categorys: ICategory[];
}

const initialState: ICategoryState = {
  category: {},
  categorys: []
};

export const addCategory = createAsyncThunk(
  "category/add",
  async (category: ICategory) => {
    const res = await addCategoryAPI(category);
    return res.data.data;
  }
);
export const listCategory = createAsyncThunk("category/list", async () => {
  const res = await listCategoryAPI();
  return res.data.data;
});
export const readCategory = createAsyncThunk(
  "category/read",
  async (id: number) => {
    const res = await getCategoryAPI(id);
    return res.data.data;
  }
);
export const removeCategory = createAsyncThunk(
  "category/remove",
  async (id: number) => {
    await removeCategoryAPI(id);
  }
);
export const updateCategory = createAsyncThunk(
  "category/update",
  async (category: ICategory, id: any) => {
    const res = await updateCategoryAPI(id, category);
    return res.data.data;
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.categorys.push(payload as ICategory);
    }),
      build.addCase(listCategory.fulfilled, (state, { payload }) => {
        state.categorys = payload as any;
      }),
      build.addCase(readCategory.fulfilled, (state, { payload }) => {
        state.category = payload;
      }),
      build.addCase(removeCategory.fulfilled, (state, { payload }) => {
        // state.products = state.products.filter((item) => item._id !== payload.id)
      });
    build.addCase(updateCategory.fulfilled, (state, { payload }) => {
      // const user = action.payload
      state.category = payload as any;
      console.log(payload);
    });
  }
});
export default categorySlice;
