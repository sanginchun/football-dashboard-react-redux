import { createSlice } from "@reduxjs/toolkit";

export const ADD = "ADD";
export const REMOVE = "REMOVE";

const initialState = JSON.parse(localStorage.getItem("customs")) || [];

const customsSlice = createSlice({
  name: "customs",
  initialState,
  reducers: {
    customsUpdated: (state, action) => {
      const { type, key } = action.payload;
      switch (type) {
        case ADD:
          state.push(key);
          break;
        case REMOVE:
          const removeIndex = state.findIndex((v) => v === key);
          state.splice(removeIndex, 1);
          break;
        default:
          console.log("no match");
      }
      localStorage.setItem("customs", JSON.stringify(state));
    },
  },
});

export const { customsUpdated } = customsSlice.actions;

export default customsSlice.reducer;
