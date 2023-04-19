import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Guilds, GuildsEmptyState } from "../../models/Guilds";

import {
  setLocalStorage,
  getLocalStorage,
} from "../../utilities/webStorage/localstorage.utility";

// Get all the guilds from the API
export const getAllGuilds = createAsyncThunk(
  "http://localhost:5000/v1/specializations",
  (guilds: Guilds) => {
    return guilds;
  }
);

export const guildsSlice = createSlice({
  name: "guilds",
  initialState:
    getLocalStorage<Guilds>("guilds") || JSON.stringify(GuildsEmptyState),
  reducers: {},
  extraReducers: {},
});

export default guildsSlice.reducer;
