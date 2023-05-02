import { createSlice } from "@reduxjs/toolkit";
import { getAllRoles } from "./actions/index";

const initialState: any[] = [];

const roles = createSlice({
  name: "roles",
  initialState,
  extraReducers: {
    [getAllRoles.fulfilled.toString()]: (state, action) => {
      return action.payload;
    },
    [getAllRoles.rejected.toString()]: (state, action) => {
      return [];
    },
  },
  reducers: {},
});

const { reducer } = roles;

export default reducer;
