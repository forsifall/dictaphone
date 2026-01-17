import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./type";

const initialState: InitialState = {
  text: null,
};

const dictaphoneSlice = createSlice({
  name: "textResponse",
  initialState: initialState,
  reducers: {
    updateText(state, action: PayloadAction<{ text: string | null }>) {
      state.text = action.payload.text;
    },
  },
});

export const { updateText } = dictaphoneSlice.actions;
export default dictaphoneSlice.reducer;
