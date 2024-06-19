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
  const [selectedItem, setSelectedItem] = useState({
    items: [],
    droppableId: null,
  });

  const swapMulti = (destination, source) => {
    const isDifferentLine =
      destination.droppableId === selectedItem.droppableId;
    if (!isDifferentLine) {
      const prevLineItem = [...lines[destination.droppableId]];

      prevLineItem.splice(destination.index, 0, ...selectedItem.items);

      const updateLineItem = [...lines[source.droppableId]].filter(
        (item) => !selectedItem.items.some(({ id }) => id === item.id)
      );

      setLines((prev) => ({
        ...prev,
        [source.droppableId]: updateLineItem,
        [destination.droppableId]: prevLineItem,
      }));
    } else {
      const prevLineItem = [...lines[source.droppableId]];

      const prevItem = prevLineItem
        .slice(
          0,
          destination.index + (source.index < destination.index ? 1 : 0)
        )
        .filter((item) => !selectedItem.items.some(({ id }) => id === item.id));

      const nextItem = prevLineItem
        .slice(destination.index + (source.index < destination.index ? 1 : 0))
        .filter((item) => !selectedItem.items.some(({ id }) => id === item.id));

      const itemsToMove = prevLineItem.filter((item) =>
        selectedItem.items.some(({ id }) => id === item.id)
      );

      setLines((prev) => ({
        ...prev,
        [source.droppableId]: [...prevItem, ...itemsToMove, ...nextItem],
      }));
    }
    setSelectedItem({ ...selectedItem, items: [] });
  };

  const swap = (destination, source) => {
    const { prevLine, nextLine } = reorder(lines, source, destination);

    setLines((prevLineItem) => ({
      ...prevLineItem,
      [source.droppableId]: prevLine,
      [destination.droppableId]: nextLine,
    }));
  };

  const handleDragEnd = ({ source, destination }) => {
    const isMultiItem = selectedItem.items.length > 1;
    if (!destination) return;

    isMultiItem ? swapMulti(destination, source) : swap(destination, source);
  };

  const toggleSelectedItem = (item, droppableId) => {
    setSelectedItem((prevSelectedItem) => {
      const isChange = droppableId !== prevSelectedItem.droppableId;

      const newItems = prevSelectedItem.items.some(
        ({ id: ItemId }) => ItemId === item.id
      )
        ? prevSelectedItem.items.filter(({ id: ItemId }) => ItemId !== item.id)
        : [...prevSelectedItem.items, item];

      return {
        droppableId,
        items: isChange ? [item] : newItems,
      };
    });
  };

  return (
    <DragDropWrapper onDragEnd={handleDragEnd}>
      {Object.keys(lines).map((id) => (
        <DropWrapper key={id} id={id}>
          <h1>
            {id} {lines[id].length}
          </h1>
          {lines[id].map((item, index) => (
            <DragWrapper
              key={item.id}
              item={item}
              index={index}
              dropId={id}
              isSelected={Boolean(
                selectedItem.items.some(({ id: itemId }) => itemId === item.id)
              )}
              selectedItem={selectedItem.items}
              onClick={toggleSelectedItem}
            />
          ))}
        </DropWrapper>
      ))}
    </DragDropWrapper>
  );
};

export default App;
