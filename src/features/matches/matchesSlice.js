import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import sportDataApi from "../../api/sportDataApi";
import { DATE_RANGE } from "../../config";
import { formatTeamName, getLocalDate } from "../../helper";

const matchesAdapter = createEntityAdapter({
  selectId: (entity) => entity.match_id,
  sortComparer: (a, b) => a.match_start.localeCompare(b.match_start),
});

const initialState = matchesAdapter.getInitialState({
  status: "idle",
  error: null,
  requested: {},
  updated: {},
});

export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (leagueId, { getState }) => {
    const seasonId = getState().leagues.entities[leagueId].seasonId;
    const dateRange = DATE_RANGE.MONTH + DATE_RANGE.WEEK;

    const dateFrom = new Date(Date.now() - dateRange)
      .toISOString()
      .slice(0, 10);
    const dateTo = new Date(Date.now() + dateRange).toISOString().slice(0, 10);

    const matches = await sportDataApi.get("/matches", {
      params: { season_id: seasonId, date_from: dateFrom, date_to: dateTo },
    });

    matches.forEach(
      (match) =>
        (match["match_start_local"] = getLocalDate(match.match_start_iso))
    );

    return { leagueId, matches };
  },
  {
    condition: (leagueId, { getState }) => {
      const requestedLeague = getState().matches.requested[leagueId];
      if (requestedLeague) return false;
    },
  }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMatches.pending]: (state, action) => {
      const leagueId = action.meta.arg;
      state.status = "loading";
      state.requested[leagueId] = true;
    },
    [fetchMatches.fulfilled]: (state, action) => {
      const { leagueId, matches } = action.payload;
      state.status = "succeeded";
      state.updated[leagueId] = true;
      matchesAdapter.addMany(state, matches);
    },
    [fetchMatches.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default matchesSlice.reducer;

export const { selectAll: selectAllMatches } = matchesAdapter.getSelectors(
  (state) => state.matches
);

export const selectMatchesFinished = createSelector(
  [selectAllMatches, (state, leagueId) => leagueId],
  (matches, leagueId) =>
    matches.filter(
      (match) =>
        match.league_id === leagueId &&
        match.status === "finished" &&
        new Date(match.match_start_iso) > new Date(Date.now() - DATE_RANGE.WEEK)
    )
);

export const selectMatchesUpcoming = createSelector(
  [selectAllMatches, (state, leagueId) => leagueId],
  (matches, leagueId) =>
    matches.filter(
      (match) =>
        match.league_id === leagueId &&
        ["notstarted", ""].includes(match.status) &&
        new Date(match.match_start_iso) < new Date(Date.now() + DATE_RANGE.WEEK)
    )
);

export const selectMatchesFinishedByTeam = createSelector(
  [selectAllMatches, (state, teamName) => teamName],
  (matches, teamName) =>
    matches.filter(
      (match) =>
        match.status === "finished" &&
        [match.home_team.name, match.away_team.name]
          .map((name) => formatTeamName(name))
          .includes(teamName)
    )
);

export const selectMatchesUpcomingByTeam = createSelector(
  [selectAllMatches, (state, teamName) => teamName],
  (matches, teamName) =>
    matches.filter(
      (match) =>
        ["notstarted", ""].includes(match.status) &&
        [match.home_team.name, match.away_team.name]
          .map((name) => formatTeamName(name))
          .includes(teamName)
    )
);
