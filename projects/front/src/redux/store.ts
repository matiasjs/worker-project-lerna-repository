import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Auth";
import { middleware } from "@/middleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
  }
})

export default store