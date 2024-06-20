import React, { useCallback } from "react";
import { data } from "./util";
import { LOCALDNDKEY } from "./constance";
import { useLocalStorage, useSelect, useErrorMessage } from "./hooks";
import { DragDropWrapper, DropWrapper, DragWrapper } from "./components";

const App = () => {
  const [localStorage, setLocalStorage] = useLocalStorage(LOCALDNDKEY);
  const { selectedItem, setSelectedItem, selectInfo, toggleSelectedItem } =
    useSelect();
  const { errorMessage, isError, handleDragUpdate } = useErrorMessage(
    selectedItem,
    selectInfo,
    localStorage
  );

  const swapMulti = (destination, source) => {
    const isDifferentLine =
      destination.droppableId === selectedItem.droppableId;
    if (!isDifferentLine) {
      const prevLineItem = [...localStorage[destination.droppableId]];

      prevLineItem.splice(destination.index, 0, ...selectedItem.items);

      const updateLineItem = [...localStorage[source.droppableId]].filter(
        (item) => !selectInfo.isSelected(item.id)
      );

      setLocalStorage((prev) => ({
        ...prev,
        [source.droppableId]: updateLineItem,
        [destination.droppableId]: prevLineItem,
      }));
    } else {
      const prevLineItem = [...localStorage[source.droppableId]];

      const prevItem = prevLineItem
        .slice(
          0,
          destination.index + (source.index < destination.index ? 1 : 0)
        )
        .filter((item) => !selectInfo.isSelected(item.id));

      const nextItem = prevLineItem
        .slice(destination.index + (source.index < destination.index ? 1 : 0))
        .filter((item) => !selectInfo.isSelected(item.id));

      const itemsToMove = prevLineItem.filter((item) =>
        selectInfo.isSelected(item.id)
      );

      setLocalStorage((prev) => ({
        ...prev,
        [source.droppableId]: [...prevItem, ...itemsToMove, ...nextItem],
      }));
    }
    setSelectedItem({ ...selectedItem, items: [] });
  };

  const swap = (destination, source) => {
    const { prevLine, nextLine } = data.reorder(
      localStorage,
      source,
      destination
    );

    setLocalStorage((prevLineItem) => ({
      ...prevLineItem,
      [source.droppableId]: prevLine,
      [destination.droppableId]: nextLine,
    }));
  };

  const handleDragEnd = useCallback(
    ({ source, destination }) => {
      const isMultiItem = selectInfo.count > 1;

      if (!destination) return;

      if (isError) {
        alert(`${errorMessage}`);
        return;
      }

      isMultiItem ? swapMulti(destination, source) : swap(destination, source);
    },
    [selectInfo, isError]
  );

  return (
    <DragDropWrapper onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
      {Object.keys(localStorage).map((id) => (
        <DropWrapper key={id} id={id} isError={isError}>
          <h2>남아있는 아이템:{localStorage[id].length}</h2>
          {localStorage[id].map((item, index) => (
            <DragWrapper
              key={item.id}
              item={item}
              index={index}
              dropId={id}
              errorMessage={errorMessage}
              isError={isError}
              selectInfo={selectInfo}
              onClick={toggleSelectedItem}
            />
          ))}
        </DropWrapper>
      ))}
    </DragDropWrapper>
  );
};

export default App;
