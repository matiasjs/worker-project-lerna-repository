import projectsService from "@/services/projects.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ----> actions
export const getMyOwnProjects = createAsyncThunk(
  "@projects/getMyOwnProjects",
  async (_, thunkAPI) => {
    try {
      const response = await projectsService.getMyOwnProjects();
      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//  actions <------
