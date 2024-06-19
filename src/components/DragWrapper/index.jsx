import React from "react";
import { GRID } from "../../constance";
import { Draggable } from "react-beautiful-dnd";
import { getStyleType } from "../../util";

const DragWrapper = ({
  item: { id, content },
  index,
  dropId,
  isSelected,
  onClick,
}) => {
  const style = (isDragging, draggableStyle) => ({
    padding: GRID * 2,
    margin: `0 0 ${GRID}px 0`,
    opacity: isSelected ? "0.4" : undefined,
    background: isDragging ? "#d1e7fd" : isSelected ? "#90EE90" : "#ffffff",
    borderRadius: "15px",
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyleType(
            style(snapshot.isDragging, provided.draggableProps.style)
          )}
          onClick={() => onClick({ id, content }, dropId)}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default DragWrapper;
