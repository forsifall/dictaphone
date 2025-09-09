import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "../types/dictaphone.type";
import { Animation } from "@/components/dictaphone/types/dictaphone.type";

const initialState: InitialState = {
  animationDictaphonePos: "null",
  endSpeak: false,
};

const dictaphoneSlice = createSlice({
  name: "dictaphone",
  initialState: initialState,
  reducers: {
    toggleDICPos(state) {
      if (state.animationDictaphonePos === "null")
        state.animationDictaphonePos = Animation.Down;
      state.animationDictaphonePos === Animation.Down
        ? (state.animationDictaphonePos = Animation.Up)
        : (state.animationDictaphonePos = Animation.Down);
      console.log(state.animationDictaphonePos);

      state.endSpeak = false;
    },
    toggleIsSpeak(state, action: PayloadAction<{ type: "speak" | "unspeak" }>) {
      switch (action.payload.type) {
        case "speak":
          state.endSpeak = true;
          break;
        case "unspeak":
          state.endSpeak = false;
      }
    },
  },
});

export const { toggleDICPos, toggleIsSpeak } = dictaphoneSlice.actions;
export default dictaphoneSlice.reducer;
