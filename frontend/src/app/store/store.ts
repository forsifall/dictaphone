import { configureStore } from "@reduxjs/toolkit";
import dictaphone from "../../entities/dictaphone/model/slice"
import textResponse from "../../entities/textResponse/model/slice";
import logs from "@/entities/logs/slice";

const store = configureStore({
    reducer: {
        dictaphone,
        textResponse,
        logs
    }
})

export default store;
export type StoreType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch;
