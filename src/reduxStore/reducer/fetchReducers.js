import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchReducer = createSlice({
  name: "fetch",
  initialState: {
    isFetching: false,
    toast: { message: "", type: "", show: false },
  },

  reducers: {
    fetching: (state, action) => {
      state.isFetching = action.payload;
    },
    success: (state, action) => {
      toast.success(action.payload);
      state.toast = {
        type: "success",
      };
    },
    error: (state, action) => {
      toast.error(action.payload);
      state.toast = {
        message: action.payload,
        type: "error",
        show: action.payload && action.payload !== "" ? true : false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle, fetching, success, error } = fetchReducer.actions;

export default fetchReducer.reducer;
