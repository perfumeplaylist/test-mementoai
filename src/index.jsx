import React, { useState } from "react";
import DragDropWrapper from "./components/DragDropWrapper";
import DropWrapper from "./components/DropWrapper";
import DragWrapper from "./components/DragWrapper";
import { data } from "./util";
import { LOCALDNDKEY } from "./constance";
import useLocalStorage from "./hooks/useLocalStorage";
import useSelect from "./hooks/useSelect";

const isOddDropId = (source, destination) => {
  return (
    source.droppableId.includes("line1") &&
    destination.droppableId.includes("line3")
  );
};

const isEvenDrop = (
  source,
  destination,
  selectedItem,
  localStorage,
  isMultiItem
) => {
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return false;
  }
  const itemId = parseInt(
    localStorage[source.droppableId][source.index].id.match(/\d+/)[0],
    10
  );

  const selectedEven = isMultiItem
    ? selectedItem.items
        .filter(({ id }) => id.match(/\d+/) % 2 === 0)
        .map(({ id }) => id)
    : itemId % 2 === 0
      ? [itemId]
      : itemId;

  let destIdx =
    destination.index +
    (source.droppableId === destination.droppableId &&
    source.index < destination.index
      ? 1
      : 0);

  if (selectedEven.length) {
    const targetInfo = localStorage[destination.droppableId][destIdx];

    const isTargetEven = targetInfo
      ? targetInfo.id.match(/\d+/) % 2 === 0
      : false;

    if (isTargetEven) return true;
  }
  return false;
};

const App = () => {
  const [localStorage, setLocalStorage] = useLocalStorage(LOCALDNDKEY);
  const { selectedItem, setSelectedItem, selectInfo, toggleSelectedItem } =
    useSelect();
  const [errorMessage, setError] = useState("");

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
    const isMultiItem = selectedItem.items.length > 1;
    const isError = errorMessage.length;

    if (!destination) return;

    if (isError) {
      alert(`${errorMessage}`);
      return;
    }

    isMultiItem ? swapMulti(destination, source) : swap(destination, source);
  };

  const handleDragUpdate = ({ source, destination }) => {
    if (!destination) return;

    const isMultiItem = selectedItem.items.length > 1;
    if (isOddDropId(source, destination)) {
      setError(
        "첫 번째 칼럼에서 세 번째 칼럼으로는 아이템 이동이 불가능해야 합니다."
      );
    } else if (
      isEvenDrop(source, destination, selectedItem, localStorage, isMultiItem)
    ) {
      setError("짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.");
    } else {
      setError("");
    }
    return;
  };

  return (
    <DragDropWrapper onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
      {Object.keys(localStorage).map((id) => (
        <DropWrapper key={id} id={id} isError={errorMessage.length > 1}>
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
