import { configureStore } from "@reduxjs/toolkit";

import leaguesReducer from "../features/leagues/leaguesSlice";
import teamsReducer from "../features/teams/teamsSlice";
import matchesReducer from "../features/matches/matchesSlice";

export const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
    teams: teamsReducer,
    matches: matchesReducer,
  },
});
