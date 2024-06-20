import React from "react";
import { data } from "./util";
import { LOCALDNDKEY } from "./constance";
import DragDropWrapper from "./components/DragDropWrapper";
import DropWrapper from "./components/DropWrapper";
import DragWrapper from "./components/DragWrapper";
import useLocalStorage from "./hooks/useLocalStorage";
import useSelect from "./hooks/useSelect";
import useErrorMessage from "./hooks/useErrorMessage";

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

  const handleDragEnd = ({ source, destination }) => {
    const isMultiItem = selectInfo.count > 1;

    if (!destination) return;

    if (isError) {
      alert(`${errorMessage}`);
      return;
    }

    isMultiItem ? swapMulti(destination, source) : swap(destination, source);
  };

  return (
    <DragDropWrapper onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
      {Object.keys(localStorage).map((id) => (
        <DropWrapper key={id} id={id} isError={isError}>
          <h1>
            {id} {localStorage[id].length}
          </h1>
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
