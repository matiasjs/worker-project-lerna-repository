import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/auth";
import guildsReducer from "./slices/guilds";
import ownProjectsReducer from "./slices/projects";
import rolesReducer from "./slices/roles";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ownProjects: ownProjectsReducer,
    roles: rolesReducer,
    guilds: guildsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
