import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import sportDataApi from "../../api/sportDataApi";
import { LEAGUE_IDS } from "../../config";
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
  async (_, { dispatch }) => {
    const seasonsArr = await Promise.all(
      LEAGUE_IDS.map((leagueId) =>
        sportDataApi.get("/seasons", {
          params: { league_id: leagueId },
        })
      )
    );

    const currentSeasonIds = [];
    seasonsArr.forEach((seasons, i) => {
      const [currentSeason] = seasons.filter((season) => season.is_current);
      currentSeasonIds[i] = currentSeason.season_id;
    });

    const standingsArr = await Promise.all(
      currentSeasonIds.map((seasonId) =>
        sportDataApi.get("/standings", { params: { season_id: seasonId } })
      )
    );

    standingsArr.forEach((standingsData, i) => {
      const leagueId = LEAGUE_IDS[i];
      const { season_id, standings } = standingsData;
      dispatch(standingsUpdated({ leagueId, season_id, standings }));
    });

    const teamIds = [];

    standingsArr.forEach((standingsData, i) => {
      const leagueId = LEAGUE_IDS[i];
      const { standings } = standingsData;

      teamIds.push(
        ...standings.map((team) => ({
          team_id: team.team_id,
          league_id: leagueId,
        }))
      );
    });

    const teams = await Promise.all(
      teamIds.map(({ team_id }) => sportDataApi.get(`/teams/${team_id}`))
    );

    // format team name, add leagueId
    teams.forEach((team, i) => {
      team.name = formatTeamName(team.name);
      team.league_id = teamIds[i].league_id;
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

export const selectTeamsIdsByLeagueId = createSelector(
  [selectAllTeams, (state, leagueId) => leagueId],
  (teams, leagueId) =>
    teams
      .filter((team) => team.league_id === leagueId)
      .map((team) => team.team_id)
);

export const selectTeamIdByTeamName = createSelector(
  [selectAllTeams, (state, teamName) => teamName],
  (teams, teamName) => teams.find((team) => team.name === teamName).team_id
);
