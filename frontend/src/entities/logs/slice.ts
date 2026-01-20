import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
    responseLogs: string[] | []
}

const initialState: InitialState = {
  responseLogs: []
};

const logsSlice = createSlice({
  name: "logs",
  initialState: initialState,
  reducers: {
    getLogs(state,action: PayloadAction<InitialState["responseLogs"]>) {
        state.responseLogs = action.payload;
    }
  },
});

export const { getLogs } = logsSlice.actions;
export default logsSlice.reducer;
