import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { GRID } from "../../constance";
import { getStyleType } from "../../util";

const style = (isDraggingOverError, isDraggingOver) => ({
  background: isDraggingOverError
    ? "#ffcccc"
    : isDraggingOver
      ? "#ADD8E6"
      : "#cbe8f0",
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
          style={getStyleType(
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
