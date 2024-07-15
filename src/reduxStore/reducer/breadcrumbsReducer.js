import { createSlice } from "@reduxjs/toolkit";

export const breadCrumbsActions = createSlice({
  name: "breadCrumbs",
  initialState: {
    breadCrumbs: { home: [{ name: "Home", link: "/" }] },
  },
  reducers: {
    addBreadCrumbs: (state, action) => {
      state.breadCrumbs = { ...state.breadCrumbs, ...action.payload };
    },
    removeBreadCrumbs: (state, action) => {
      state.breadCrumbs = action.payload.breadCrumbs;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBreadCrumbs, removeBreadCrumbs } = breadCrumbsActions.actions;

export default breadCrumbsActions.reducer;
