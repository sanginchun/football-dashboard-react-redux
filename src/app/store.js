import { configureStore } from "@reduxjs/toolkit";

import leaguesReducer from "../features/leagues/leaguesSlice";
import teamsReducer from "../features/teams/teamsSlice";

export const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
    teams: teamsReducer,
  },
});
