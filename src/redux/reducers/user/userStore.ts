import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import uiReducer from '../ui/UiSlice'
import hospitalReducer from "../hospital/hospitalSlice";

export const userStore = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer,
        hospital: hospitalReducer
    }
})


export type RootState = ReturnType<typeof userStore.getState>
export type AppDispatch = typeof userStore.dispatch;