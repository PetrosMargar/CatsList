import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CatListState {
  categoryList: any[];
  categoryData: any[];
}

const initialState: CatListState = {
  categoryList: [],
  categoryData: [],
};

export const catListSlice = createSlice({
  name: 'catList',
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
    addCategoryData: (state, action) => {
      state.categoryData = [...state.categoryData, ...action.payload];
    }
  },
}
)

export const { setCategoryList, setCategoryData, addCategoryData } = catListSlice.actions;

export const selectCatList = (state: RootState) => state.catList.categoryList;
export const selectCategoryData = (state: RootState) => state.catList.categoryData;


export default catListSlice.reducer;
