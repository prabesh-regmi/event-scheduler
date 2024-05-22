/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holidays: null,
};

const holidaysSlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    setHolidays: (state, action) => {
      state.holidays = action.payload.holidays;
    },
    clearHolidays: (state) => {
      state.holidays = null;
    },
  },
});

export const { setHolidays, clearHolidays } = holidaysSlice.actions;
export default holidaysSlice.reducer;
