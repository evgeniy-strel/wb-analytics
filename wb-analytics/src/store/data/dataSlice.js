import { createSlice, current } from "@reduxjs/toolkit";

const dataSlice = createSlice({
   name: "data",
   initialState: {
      activeCategory: null,
      activeSubCategory: null,
      categoriesFull: [],
      categories: [],
      subCategories: [],
      productsFull: [],
      products: [],
   },
   reducers: {
      setCategoriesFull(state, action) {
         state.categoriesFull = action.payload;
      },
      setProductsFull(state, action) {
         state.productsFull = action.payload;
      },
      setCategories(state, action) {
         state.categories = action.payload;
      },
      setSubCategories(state, action) {
         state.subCategories = action.payload;
      },
      setActiveCategory(state, action) {
         const categoryName = action.payload;

         state.activeCategory = categoryName;
         state.activeSubCategory = null;

         console.log(categoryName);

         const currentState = current(state);

         const category = currentState.categoriesFull.find((cat) => cat.name === categoryName);

         if (!category) {
            state.products = [];
            return;
         }

         state.products = currentState.productsFull.filter(
            (product) => product.category_id == category?.wb_id,
         );
      },
      setActiveSubCategory(state, action) {
         state.activeSubCategory = action.payload;
      },
   },
});

export const {
   setCategories,
   setSubCategories,
   setActiveCategory,
   setActiveSubCategory,
   setCategoriesFull,
   setProductsFull,
} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
