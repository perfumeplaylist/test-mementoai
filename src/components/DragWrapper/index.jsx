import React from "react";
import { Color, GRID } from "../../constance";
import { Draggable } from "react-beautiful-dnd";
import { getStyle } from "../../util";
import NumberBox from "../NumberBox";
import ErrorMessage from "../ErrorMessage";

const style = (isDraggingError, isDragging, isSelected, draggableStyle) => ({
  padding: GRID * 2,
  margin: `0 0 ${GRID}px 0`,
  opacity: isSelected ? "0.4" : undefined,
  background: isDraggingError
    ? Color.dragRed
    : isDragging
      ? Color.dragIngBlue
      : isSelected
        ? Color.selectGreen
        : Color.white,
  borderRadius: "15px",
  cursor: isDraggingError ? "not-allowed" : "pointer",
  ...draggableStyle,
});

const DragWrapper = ({
  item: { id, content },
  index,
  dropId,
  selectInfo,
  errorMessage,
  isError,
  onClick,
}) => {
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
              selectInfo.isSelected(id),
              provided.draggableProps.style
            )
          )}
          onClick={() => onClick({ id, content }, dropId)}
        >
          {content}
          {snapshot.isDragging && (
            <>
              <NumberBox count={selectInfo.count} isError={isError} />
              {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DragWrapper;
