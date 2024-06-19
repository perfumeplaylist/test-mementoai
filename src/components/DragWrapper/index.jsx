import React from "react";
import { GRID } from "../../constance";
import { Draggable } from "react-beautiful-dnd";
import { getStyle } from "../../util";
import NumberBox from "../NumberBox";
import ErrorMessage from "../ErrorMessage";

const style = (isDraggingError, isDragging, isSelected, draggableStyle) => ({
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  opacity: isSelected ? "0.4" : undefined,
  background: isDraggingError
    ? "#ffe6e6"
    : isDragging
      ? "#d1e7fd"
      : isSelected
        ? "#90EE90"
        : "#ffffff",
  borderRadius: "15px",
  cursor: isDraggingError ? "not-allowed" : "pointer",
  ...draggableStyle,
});

const DragWrapper = ({
  item: { id, content },
  index,
  dropId,
  isSelected,
  selectedItem,
  errorMessage,
  onClick,
}) => {
  const isError = errorMessage.length > 1;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(
            style(
              snapshot.isDragging && isError,
              snapshot.isDragging,
              isSelected,
              provided.draggableProps.style
            )
          )}
          onClick={() => onClick({ id, content }, dropId)}
        >
          {content}
          {snapshot.isDragging && (
            <>
              <NumberBox count={selectedItem.length} isError={isError} />
              {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DragWrapper;
