import { createSlice } from "@reduxjs/toolkit";

export const authActions = createSlice({
  name: "user",
  initialState: {
    isLoggin: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggin = action.payload.isLoggin;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggin = false;
      state.user = {};
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.user };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUser } = authActions.actions;

export default authActions.reducer;
