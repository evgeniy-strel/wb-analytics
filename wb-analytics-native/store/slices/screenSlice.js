import { createSlice, current } from "@reduxjs/toolkit";

const screenSlice = createSlice({
   name: "screen",
   initialState: {
      activeCategory: null,
      activeSubCategory: null,
      categoriesFull: [],
      categories: [],
      subCategories: [],
      isNeedScrollToTop: false,
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
      setNeedScrollToTop(state, action) {
         state.isNeedScrollToTop = true;
      },
      setDontNeedScrollToTop(state) {
         state.isNeedScrollToTop = false;
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

         const currentState = current(state);

         const category = currentState.categoriesFull.find((cat) => cat.name === categoryName);

         if (!category) {
            state.products = [];
            return;
         }

         console.log(category.wb_id);

         state.products = currentState.productsFull.filter(
            (product) => product.category_id == category.wb_id,
         );
      },
      setActiveSubCategory(state, action) {
         state.activeSubCategory = action.payload;
      },
   },
});

export const {
   setNeedScrollToTop,
   setDontNeedScrollToTop,
   setCategories,
   setSubCategories,
   setActiveCategory,
   setActiveSubCategory,
   setCategoriesFull,
   setProductsFull,
} = screenSlice.actions;

export const screenReducer = screenSlice.reducer;
