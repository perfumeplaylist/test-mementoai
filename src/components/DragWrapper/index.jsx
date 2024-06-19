import React from "react";
import NumberBox from "../NumberBox";
import { GRID } from "../../constance";
import { Draggable } from "react-beautiful-dnd";
import { getStyleType } from "../../util";

const DragWrapper = ({ item: { id, content }, index, dropId }) => {
  const style = (isDragging, draggableStyle) => ({
    padding: GRID * 2,
    margin: `0 0 ${GRID}px 0`,
    background: isDragging ? "#d1e7fd" : "#ffffff",
    borderRadius: "15px",
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={dropId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyleType(
            style(snapshot.isDragging, provided.draggableProps.style)
          )}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default DragWrapper;
