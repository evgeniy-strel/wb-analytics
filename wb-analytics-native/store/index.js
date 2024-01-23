import { configureStore } from "@reduxjs/toolkit";
import { screenReducer } from "./slices/screenSlice";

export default configureStore({
   reducer: { screen: screenReducer },
});
