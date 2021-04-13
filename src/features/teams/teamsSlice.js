import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import sportDataApi from "../../api/sportDataApi";
import { formatTeamName } from "../../helper";
import { standingsUpdated } from "../leagues/leaguesSlice";

const teamsAdapter = createEntityAdapter({
  selectId: (entity) => entity.team_id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = teamsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (leagueId, { dispatch }) => {
    const seasons = await sportDataApi.get("/seasons", {
      params: { league_id: leagueId },
    });

    const [currentSeason] = seasons.filter((season) => season.is_current);

    const { standings } = await sportDataApi.get("/standings", {
      params: { season_id: currentSeason.season_id },
    });

    dispatch(standingsUpdated({ leagueId, standings }));

    const teams = await Promise.all(
      standings.map((team) => sportDataApi.get(`/teams/${team.team_id}`))
    );

    // format team name, add league id
    teams.forEach((team) => {
      team.name = formatTeamName(team.name);
      team["league_id"] = leagueId;
    });

    return teams;
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeams.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchTeams.fulfilled]: (state, action) => {
      state.status = "succeeded";
      teamsAdapter.addMany(state, action.payload);
    },
    [fetchTeams.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default teamsSlice.reducer;

export const {
  selectAll: selectAllTeams,
  selectById: selectTeamById,
} = teamsAdapter.getSelectors((state) => state.teams);

export const selectTeamsByLeagueId = createSelector(
  [selectAllTeams, (state, leagueId) => leagueId],
  (teams, leagueId) => teams.filter((team) => team.league_id === leagueId)
);
