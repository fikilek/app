import { configureStore } from "@reduxjs/toolkit";
import astsReducer from './astsSlice'
import trnsReducer from './trnsSlice'
import authReducer from './authSlice'
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    asts: astsReducer,
    trns: trnsReducer,
    auth: authReducer,
    admin: adminReducer,
  }
})

// console.log(`store`, store)

export default store