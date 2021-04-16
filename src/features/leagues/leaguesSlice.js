import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import sportDataApi from "../../api/sportDataApi";
import { LEAGUE_IDS } from "../../config";

const leaguesAdapter = createEntityAdapter({
  selectId: (entity) => entity.league_id,
});

const initialState = leaguesAdapter.getInitialState({
  status: "idle",
  topScorersStatus: "idle",
  error: null,
});

export const fetchLeagues = createAsyncThunk(
  "leagues/fetchLeagues",
  async () => {
    const leagues = await Promise.all(
      LEAGUE_IDS.map((leagueId) => sportDataApi.get(`/leagues/${leagueId}`))
    );

    const countries = await Promise.all(
      leagues.map((league) =>
        sportDataApi.get(`/countries/${league.country_id}`)
      )
    );

    return leagues.map((league, i) => ({
      ...league,
      countryName: countries[i].name,
    }));
  }
);

export const fetchTopScorers = createAsyncThunk(
  "leagues/fetchTopScorers",
  async ({ leagueId, seasonId }) => {
    const topScorers = await sportDataApi.get("/topscorers", {
      params: { season_id: seasonId },
    });

    return { leagueId, topScorers };
  }
);

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    standingsUpdated: (state, action) => {
      const { leagueId, season_id, standings } = action.payload;
      state.entities[leagueId].standings = standings;
      state.entities[leagueId].seasonId = season_id;
    },
  },
  extraReducers: {
    [fetchLeagues.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchLeagues.fulfilled]: (state, action) => {
      leaguesAdapter.addMany(state, action.payload);
      state.status = "succeeded";
    },
    [fetchLeagues.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchTopScorers.pending]: (state, action) => {
      state.topScorersStatus = "loading";
    },
    [fetchTopScorers.fulfilled]: (state, action) => {
      const { leagueId, topScorers } = action.payload;
      state.entities[leagueId].topScorers = topScorers;
      state.topScorersStatus = "succeeded";
    },
    [fetchTopScorers.rejected]: (state, action) => {
      state.topScorersStatus = "failed";
      state.error = action.error.message;
    },
  },
});

export const { standingsUpdated } = leaguesSlice.actions;

export default leaguesSlice.reducer;

export const {
  selectIds: selectLeagueIds,
  selectById: selectLeagueById,
} = leaguesAdapter.getSelectors((state) => state.leagues);
