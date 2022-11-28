import { configureStore } from "@reduxjs/toolkit";
import astsReducer from './astsSlice'
import trnsReducer from './trnsSlice'
import authReducer from './authSlice'
import adminReducer from "./adminSlice";
import schReducer from './schSlice'

const store = configureStore({
  reducer: {
    asts: astsReducer,
    trns: trnsReducer,
    auth: authReducer,
    admin: adminReducer,
    sch: schReducer,
  }
})

// console.log(`store state`, store.getState())

export default store