/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEditingEvent: (state, action) => {
      state.event = action.payload.event;
    },
    clearEditingEvent: (state) => {
      state.event = null;
    },
    setAddEvent: (state, action) => {
      state.event = { start: action.payload.start, end: action.payload.end };
    },
  },
});

export const { setEditingEvent, clearEditingEvent, setAddEvent } =
  eventSlice.actions;
export default eventSlice.reducer;
