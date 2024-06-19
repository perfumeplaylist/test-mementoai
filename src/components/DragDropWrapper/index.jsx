import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { getStyleType } from "../../util";

const DragDropWrapper = ({ onDragEnd, children }) => {
  const style = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    justifyContent: "center",
    height: "95vh",
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={getStyleType(style)}>{children}</div>
    </DragDropContext>
  );
};

export default DragDropWrapper;
