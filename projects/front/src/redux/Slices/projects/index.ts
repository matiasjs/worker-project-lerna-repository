import { Project } from "@/models/project.model";
import { createSlice } from "@reduxjs/toolkit";
import { getMyOwnProjects } from "./actions/index";

const initialState: Project[] = [];

const ownProjects = createSlice({
  name: "ownProjects",
  initialState,
  extraReducers: {
    [getMyOwnProjects.fulfilled.toString()]: (state, action) => {
      return action.payload;
    },
    [getMyOwnProjects.rejected.toString()]: (state, action) => {
      return [];
    },
  },
  reducers: {},
});

const { reducer } = ownProjects;

export default reducer;
