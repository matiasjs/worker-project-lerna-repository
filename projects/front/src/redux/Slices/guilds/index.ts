import { createSlice } from "@reduxjs/toolkit";
import { getAllGuilds } from "./actions/index";

const initialState: any[] = [];

const guilds = createSlice({
  name: "guilds",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllGuilds.fulfilled.toString(), (state, action) => {
        return (action as any).payload;
      })
      .addCase(getAllGuilds.rejected.toString(), (state, action) => {
        return [];
      });
  },
  reducers: {},
});

const { reducer } = guilds;

export default reducer;
