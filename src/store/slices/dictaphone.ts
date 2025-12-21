import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "../types/dictaphone.type";
import { Animation } from "@/components/dictaphone/types/dictaphone.type";

const initialState: InitialState = {
  animationDictaphonePos: "null",
  endSpeak: false,
  response: null,
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
          break;
        case "speak":
      }
    },
    getChatGPTResponse(state,action:PayloadAction<{text:string}>) {
      state.response = action.payload.text;
    }
  },
});

export const { toggleDICPos, toggleIsSpeak, getChatGPTResponse } = dictaphoneSlice.actions;
export default dictaphoneSlice.reducer;
