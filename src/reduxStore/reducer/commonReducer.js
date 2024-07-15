import { createSlice } from "@reduxjs/toolkit";

export const commonReducer = createSlice({
  name: "common",
  initialState: {
    userRole: [],
    country: [],
    userGroup: [],
    testingOffice: [],
    roleDetails: [],
  },
  reducers: {
    setUserRoles: (state, action) => {
      state.userRole = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setUserGroup: (state, action) => {
      state.userGroup = action.payload;
    },
    setTestingOfficeOptions: (state, action) => {
      state.testingOffice = action.payload;
    },
    setRolesDetails: (state, action) => {
      state.roleDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserRoles,
  setCountry,
  setUserGroup,
  setTestingOfficeOptions,
  setRolesDetails,
  setObjectTypes,
} = commonReducer.actions;

export default commonReducer.reducer;
