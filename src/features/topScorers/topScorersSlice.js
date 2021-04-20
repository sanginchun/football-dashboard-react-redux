import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sportDataApi from "../../api/sportDataApi";
import { LEAGUE_IDS } from "../../others/config";

const initialState = {};
LEAGUE_IDS.forEach((leagueId) => (initialState[leagueId] = { status: "idle" }));

export const fetchTopScorers = createAsyncThunk(
  "tops/fetchTopScorers",
  async (leagueId, { getState }) => {
    const seasonId = getState().leagues.entities[leagueId].seasonId;

    const topScorers = await sportDataApi.get("/topscorers", {
      params: { season_id: seasonId },
    });

    return { leagueId, topScorers };
  },
  {
    condition: (leagueId, { getState }) => {
      const status = getState().topScorers[leagueId].status;

      if (status !== "idle") return false;
    },
  }
);

const topScorersSlice = createSlice({
  name: "tops",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTopScorers.pending]: (state, action) => {
      const leagueId = action.meta.arg;
      state[leagueId].status = "loading";
    },
    [fetchTopScorers.fulfilled]: (state, action) => {
      const { leagueId, topScorers } = action.payload;
      state[leagueId].status = "succeeded";
      state[leagueId].topScorers = topScorers;
    },
    [fetchTopScorers.rejected]: (state, action) => {
      const leagueId = action.meta.arg;
      state[leagueId].status = "failed";
      state[leagueId].error = action.error.message;
    },
  },
});

export default topScorersSlice.reducer;
