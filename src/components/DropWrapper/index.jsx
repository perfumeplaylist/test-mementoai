import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { GRID } from "../../constance";
import { getStyleType } from "../../util";

const DropWrapper = ({ id, children }) => {
  const style = (isDraggingOver) => ({
    background: isDraggingOver ? "#ADD8E6" : "#cbe8f0",
    padding: GRID,
    width: 250,
    height: 500,
    overflowY: "auto",
    borderRadius: "15px",
  });

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getStyleType(style(snapshot.isDraggingOver))}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropWrapper;
