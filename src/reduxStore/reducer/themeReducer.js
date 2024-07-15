import { createSlice } from "@reduxjs/toolkit";

export const themeActions = createSlice({
  name: "theme",
  initialState: {
    sidebarWidth: "250px",
  },

  reducers: {
    toggle: (state, action) => {
      state.sidebarWidth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = themeActions.actions;

export default themeActions.reducer;
