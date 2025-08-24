import { createSlice } from "@reduxjs/toolkit";
import type {InitialState} from "../types/dictaphone.type";
import { Animation } from "@/components/dictaphone/types/dictaphone.type";

const initialState: InitialState = {
    animationDictaphonePos: Animation.Up,
    endSpeak: false,
    
}

const dictaphoneSlice = createSlice({
    name: "dictaphone",
    initialState: initialState,
    reducers: {
        toggleDICPos(state) {
            state.animationDictaphonePos === Animation.Down || null 
            ? state.animationDictaphonePos = Animation.Up 
            : state.animationDictaphonePos = Animation.Down;
        },
        toggleIsSpeak(state) {
            state.endSpeak = !state.endSpeak;
        }
    }
})

export const {toggleDICPos, toggleIsSpeak} = dictaphoneSlice.actions
export default dictaphoneSlice.reducer;