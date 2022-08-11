import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

export const store = configureStore({
  reducer: { // here we can put slices 
    basket: basketReducer,
  },
});
