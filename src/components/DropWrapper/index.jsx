import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Color, GRID } from "../../constance";
import { getStyle } from "../../util";

const style = (isDraggingOverError, isDraggingOver) => ({
  background: isDraggingOverError
    ? Color.dropRed
    : isDraggingOver
      ? Color.dropOverBlue
      : Color.dropBoxBlue,
  padding: GRID,
  width: 250,
  height: 500,
  overflowY: "auto",
  borderRadius: "15px",
});

const DropWrapper = ({ id, children, isError }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getStyle(
            style(snapshot.isDraggingOver && isError, snapshot.isDraggingOver)
          )}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropWrapper;
