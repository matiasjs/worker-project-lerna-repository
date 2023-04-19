import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { guildsSlice, getAllGuilds } from "./slices/guilds.slice";

export const store = configureStore({
  reducer: {
    guilds: guildsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
