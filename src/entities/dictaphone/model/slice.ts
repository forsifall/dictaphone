import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "./slice.types";
import { Animation } from "./dictaphone.type";

const initialState: InitialState = {
  animationDictaphonePos: "null",
  endSpeak: null,
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
    toggleIsSpeak(state, action: PayloadAction<{ type: "speak" | "noSpeak" }>) {
      switch (action.payload.type) {
        case "noSpeak":
          state.endSpeak = true;
          break;
        case "speak":
          state.endSpeak = false;
      }
    },
  },
});

export const { toggleDICPos, toggleIsSpeak } = dictaphoneSlice.actions;
export default dictaphoneSlice.reducer;
