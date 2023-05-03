import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./actions";

const user = null;

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled.toString()]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected.toString()]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled.toString()]: (state, action) => {
      return { ...state, isLoggedIn: true, user: action.payload.user };
    },
    [login.rejected.toString()]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled.toString()]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  reducers: {},
});

const { reducer } = authSlice;

export default reducer;
