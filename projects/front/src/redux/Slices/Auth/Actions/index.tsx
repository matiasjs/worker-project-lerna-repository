import authService from "@/services/Auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ----> actions
export const register = createAsyncThunk(
  "@auth/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await authService.register(email, password);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const login = createAsyncThunk(
  "@auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password)
      return { user: data }
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
})

//  actions <------