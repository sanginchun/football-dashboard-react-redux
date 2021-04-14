import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import sportDataApi from "../../api/sportDataApi";

const playersAdapter = createEntityAdapter({
  selectId: (entity) => entity.player_id,
});

const initialState = playersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchPlayer = createAsyncThunk(
  "players/fetchPlayer",
  async (playerId) => {
    const player = await sportDataApi.get(`/players/${playerId}`);

    return player;
  }
);

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlayer.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPlayer.fulfilled]: (state, action) => {
      playersAdapter.addOne(state, action.payload);
      state.status = "succeeded";
    },
    [fetchPlayer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default playersSlice.reducer;

export const { selectById: selectPlayerById } = playersAdapter.getSelectors(
  (state) => state.players
);
