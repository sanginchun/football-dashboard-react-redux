import { configureStore } from "@reduxjs/toolkit";

import leaguesReducer from "../features/leagues/leaguesSlice";
import teamsReducer from "../features/teams/teamsSlice";
import matchesReducer from "../features/matches/matchesSlice";
import topScorersReducer from "../features/topScorers/topScorersSlice";
import playersReducer from "../features/players/playersSlice";

export const store = configureStore({
  reducer: {
    leagues: leaguesReducer,
    teams: teamsReducer,
    matches: matchesReducer,
    topScorers: topScorersReducer,
    players: playersReducer,
  },
});
