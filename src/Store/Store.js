import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./Question-slice";

const store = configureStore({
  reducer: { question: questionReducer },
});

export default store;
