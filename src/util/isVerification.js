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

export default { isOddDropId, isEvenDrop };
