import { createSlice } from "@reduxjs/toolkit";
import type {InitialState} from "../types/dictaphone.type";
import { Animation } from "@/components/dictaphone/types/dictaphone.type";

const initialState: InitialState = {
    animationDictaphonePos: Animation.Up
}

const dictaphoneSlice = createSlice({
    name: "dictaphone",
    initialState: initialState,
    reducers: {
        toggleDICPos(state) {
            state.animationDictaphonePos === Animation.Down || null 
            ? state.animationDictaphonePos = Animation.Up 
            : state.animationDictaphonePos = Animation.Down;
        }
    }
})

export const {toggleDICPos} = dictaphoneSlice.actions
export default dictaphoneSlice.reducer;