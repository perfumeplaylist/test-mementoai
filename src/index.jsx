import React, { useState, useEffect } from "react";
import DragDropWrapper from "./components/DragDropWrapper/index";
import DropWrapper from "./components/DropWrapper/index";
import DragWrapper from "./components/DragWrapper/index";
import { data, localStorage } from "./util";

const isOddDropId = (source, destination) => {
  return (
    source.droppableId.includes("line1") &&
    destination.droppableId.includes("line3")
  );
};

const isEvenDrop = (source, destination, selectedItem, lines, isMultiItem) => {
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return false;
  }
  const itemId = parseInt(
    lines[source.droppableId][source.index].id.match(/\d+/)[0],
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
    const targetInfo = lines[destination.droppableId][destIdx];

    const isTargetEven = targetInfo
      ? targetInfo.id.match(/\d+/) % 2 === 0
      : false;

    if (isTargetEven) return true;
  }
  return false;
};

const App = () => {
  const [lines, setLines] = useState(localStorage.get("dnd"));
  const [errorMessage, setError] = useState("");
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
    const { prevLine, nextLine } = data.reorder(lines, source, destination);

    setLines((prevLineItem) => ({
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
      isEvenDrop(source, destination, selectedItem, lines, isMultiItem)
    ) {
      setError("짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.");
    } else {
      setError("");
    }
    return;
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

  useEffect(() => {
    localStorage.set("dnd", { ...lines });
  }, [lines]);

  return (
    <DragDropWrapper onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
      {Object.keys(lines).map((id) => (
        <DropWrapper key={id} id={id} isError={errorMessage.length > 1}>
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
              errorMessage={errorMessage}
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
