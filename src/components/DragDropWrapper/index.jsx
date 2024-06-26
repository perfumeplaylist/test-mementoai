import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { getStyle } from "../../util";

const style = {
  display: "flex",
  gap: "24px",
  alignItems: "center",
  justifyContent: "center",
  height: "95vh",
};

const DragDropWrapper = ({ onDragEnd, onDragUpdate, children }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <div style={getStyle(style)}>{children}</div>
    </DragDropContext>
  );
};

export default DragDropWrapper;
