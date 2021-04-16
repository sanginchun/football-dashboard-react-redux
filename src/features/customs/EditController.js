import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon, Popup } from "semantic-ui-react";

import {
  SELECT_ALL,
  UNSELECT_ALL,
  MOVE_LEFT,
  MOVE_RIGHT,
  DELETE,
  UNDO,
  customsUpdated,
  cardSelectionToggled,
} from "./customsSlice";

const style = { root: { marginLeft: "auto" } };

function EditController() {
  const dispatch = useDispatch();
  const customs = useSelector((state) => state.customs.data);
  const selected = useSelector((state) => state.customs.selected);
  const editHistory = useSelector((state) => state.customs.editHistory);

  const selectedAll = customs.length && customs.length === selected.length;

  return (
    <div style={style.root}>
      <Button.Group basic size="small">
        <Popup
          size="small"
          content={selectedAll ? "Unselect All" : "Select All"}
          trigger={
            <Button
              icon
              disabled={!customs.length}
              onClick={() => {
                const actionType = selectedAll ? UNSELECT_ALL : SELECT_ALL;
                dispatch(cardSelectionToggled({ type: actionType }));
              }}
            >
              <Icon
                size="large"
                name={selectedAll ? "check square outline" : "square outline"}
              />
            </Button>
          }
        />
        <Popup
          size="small"
          content="Move Left"
          trigger={
            <Button
              icon="arrow left"
              disabled={!selected.length || selectedAll}
              onClick={() => {
                const selectedIndices = selected.map((key) =>
                  customs.findIndex((v) => v === key)
                );
                // prettier-ignore
                if(selectedIndices.every(index => index === 0 || selected.includes(customs[index - 1])))
                  return;

                dispatch(customsUpdated({ type: MOVE_LEFT }));
              }}
            />
          }
        />
        <Popup
          size="small"
          content="Move Right"
          trigger={
            <Button
              icon="arrow right"
              disabled={!selected.length || selectedAll}
              onClick={() => {
                const selectedIndices = selected.map((key) =>
                  customs.findIndex((v) => v === key)
                );
                // prettier-ignore
                if(selectedIndices.every(index => index === customs.length - 1 || selected.includes(customs[index + 1])))
                  return;

                dispatch(customsUpdated({ type: MOVE_RIGHT }));
              }}
            />
          }
        />
        <Popup
          size="small"
          content="Remove"
          trigger={
            <Button
              icon="trash"
              disabled={!selected.length}
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure to remove ${selected.length} content${
                      selected.length > 1 ? "s" : ""
                    }?`
                  )
                )
                  dispatch(customsUpdated({ type: DELETE }));
              }}
            />
          }
        />
        <Popup
          size="small"
          content="Undo"
          trigger={
            <Button
              icon="undo"
              disabled={!editHistory.length}
              onClick={() => dispatch(customsUpdated({ type: UNDO }))}
            />
          }
        />
      </Button.Group>
    </div>
  );
}

export default EditController;
