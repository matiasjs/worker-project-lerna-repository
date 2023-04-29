import guildsService from "@/services/guilds.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ----> actions
export const getAllGuilds = createAsyncThunk(
  "@projects/getAllGuilds",
  async (_, thunkAPI) => {
    try {
      const response = await guildsService.getAllGuilds();
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//  actions <------
