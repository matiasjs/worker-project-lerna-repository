import rolesService from "@/services/roles.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ----> actions
export const getAllRoles = createAsyncThunk(
  "@projects/getAllRoles",
  async (_, thunkAPI) => {
    try {
      const response = await rolesService.getAllRoles();
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//  actions <------
