import { createSlice } from "@reduxjs/toolkit";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const SELECT_ALL = "SELECT_ALL";
export const UNSELECT_ALL = "UNSELECT_ALL";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const DELETE = "DELETE";
export const UNDO = "UNDO";

const initialState = {
  data: JSON.parse(localStorage.getItem("customs")) || [],
  selected: [],
  editMode: false,
  editHistory: [],
};

const customsSlice = createSlice({
  name: "customs",
  initialState,
  reducers: {
    customsUpdated: (state, action) => {
      const { type, key } = action.payload;
      const selectedIndices = state.selected.map((key) =>
        state.data.findIndex((v) => v === key)
      );
      const customsCopy = state.data.slice();
      if (state.editMode && type !== UNDO) {
        state.editHistory.push({
          data: [...state.data],
          selected: [...state.selected],
        });
      }

      switch (type) {
        case ADD:
          state.data.push(key);
          break;
        case REMOVE:
          const removeIndex = state.data.findIndex((v) => v === key);
          state.data.splice(removeIndex, 1);
          break;
        case MOVE_LEFT:
          selectedIndices.sort((a, b) => a - b);
          selectedIndices.forEach((index) => {
            if (index && !state.selected.includes(customsCopy[index - 1])) {
              const temp = customsCopy[index];
              customsCopy[index] = customsCopy[index - 1];
              customsCopy[index - 1] = temp;
            }
          });
          state.data = customsCopy;
          break;
        case MOVE_RIGHT:
          selectedIndices.sort((a, b) => b - a);
          selectedIndices.forEach((index) => {
            if (
              index < state.data.length - 1 &&
              !state.selected.includes(customsCopy[index + 1])
            ) {
              const temp = customsCopy[index];
              customsCopy[index] = customsCopy[index + 1];
              customsCopy[index + 1] = temp;
            }
          });
          state.data = customsCopy;
          break;
        case DELETE:
          selectedIndices.forEach((index) => (customsCopy[index] = null));
          state.selected = [];
          state.data = customsCopy.filter(Boolean);
          break;
        case UNDO:
          const {
            data: prevData,
            selected: prevSelected,
          } = state.editHistory.pop();
          state.data = prevData;
          state.selected = prevSelected;
          break;
        default:
          console.log("no match");
      }
      localStorage.setItem("customs", JSON.stringify(state.data));
    },
    editModeToggled: (state, action) => {
      state.editMode = !state.editMode;
      if (!state.editMode) {
        // done
        state.selected = [];
        state.editHistory = [];
      }
    },
    cardSelectionToggled: (state, action) => {
      const { type, key } = action.payload;
      switch (type) {
        case ADD:
          state.selected.push(key);
          break;
        case REMOVE:
          const removeIndex = state.selected.findIndex((v) => v === key);
          state.selected.splice(removeIndex, 1);
          break;
        case SELECT_ALL:
          state.selected = state.data;
          break;
        case UNSELECT_ALL:
          state.selected = [];
          break;
        default:
          console.log("no match");
      }
    },
  },
});

export const {
  customsUpdated,
  editModeToggled,
  cardSelectionToggled,
} = customsSlice.actions;

export default customsSlice.reducer;
