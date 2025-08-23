import { configureStore } from "@reduxjs/toolkit";
import dictaphone from "./slices/dictaphone"

const store = configureStore({
    reducer: {
        dictaphone
    }
})

export default store;
export type StoreType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;
