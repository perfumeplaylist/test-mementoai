import React, { useState } from "react";
import DragDropWrapper from "./components/DragDropWrapper/index";
import DropWrapper from "./components/DropWrapper/index";
import DragWrapper from "./components/DragWrapper/index";
import { getItems, reorder } from "./util";

const initalState = {
  line1: getItems(5),
  line2: getItems(4),
  line3: getItems(6),
  line4: getItems(7),
};

const App = () => {
  const [lines, setLines] = useState(initalState);

  const swap = (destination, source) => {
    const prevLine = [...lines[source.droppableId]];
    const nextLine = [...lines[destination.droppableId]];

    const [removed] = prevLine.splice(source.index, 1);
    if (source.droppableId === destination.droppableId)
      nextLine.splice(source.index, 1);
    nextLine.splice(destination.index, 0, removed);

    setLines((prevLineItem) => ({
      ...prevLineItem,
      [source.droppableId]: prevLine,
      [destination.droppableId]: nextLine,
    }));
  };

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return;

    swap(destination, source);
  };

  return (
    <DragDropWrapper onDragEnd={handleDragEnd}>
      {Object.keys(lines).map((id) => (
        <DropWrapper key={id} id={id}>
          <h1>
            {id} {lines[id].length}
          </h1>
          {lines[id].map((item, index) => (
            <DragWrapper key={item.id} item={item} index={index} dropId={id} />
          ))}
        </DropWrapper>
      ))}
    </DragDropWrapper>
  );
};

export default App;
