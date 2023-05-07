import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./actions";

const user = null;

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled.toString(), (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected.toString(), (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled.toString(), (state, action) => {
        return {
          ...state,
          isLoggedIn: true,
          user: (action as any).payload.user,
        };
      })
      .addCase(login.rejected.toString(), (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled.toString(), (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
  reducers: {},
});

const { reducer } = authSlice;

export default reducer;
