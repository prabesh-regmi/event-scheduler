/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    clearEvents: (state) => {
      state.events = null;
    },
  },
});

export const { setEvents, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
