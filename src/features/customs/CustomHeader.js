import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Segment } from "semantic-ui-react";

import { editModeToggled } from "./customsSlice";
import EditController from "./EditController";

const style = {
  root: {
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease-in-out",
  },
  editMode: {
    position: "sticky",
    top: "0",
    zIndex: "99",
    margin: "1rem -2rem",
  },
  text: {
    marginLeft: "2rem",
  },
};

function CustomHeader() {
  const dispatch = useDispatch();
  const customs = useSelector((state) => state.customs.data);
  const isEditMode = useSelector((state) => state.customs.editMode);

  const rootStyle = isEditMode
    ? { ...style.root, ...style.editMode }
    : { ...style.root };

  return (
    <Segment style={rootStyle}>
      <Button
        size="small"
        onClick={() => dispatch(editModeToggled())}
        basic={!isEditMode}
        color="blue"
        disabled={!isEditMode && !customs.length}
        content={isEditMode ? "Done" : "Edit"}
      />
      {isEditMode ? (
        <EditController />
      ) : (
        <div style={style.text}>
          {customs.length
            ? "You can remove or change order of contents"
            : "No contents added yet"}
        </div>
      )}
    </Segment>
  );
}

export default CustomHeader;
