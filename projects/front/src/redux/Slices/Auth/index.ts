import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./Actions";


const user = null;

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

  
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      return {...state, isLoggedIn: true, user: action.payload.user}
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});


const { reducer } = authSlice;

export default reducer;