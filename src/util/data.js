const reorder = (lines, startInfo, endInfo) => {
  const prevLine = [...lines[startInfo.droppableId]];
  const nextLine = [...lines[endInfo.droppableId]];

  const [removed] = prevLine.splice(startInfo.index, 1);
  if (startInfo.droppableId === endInfo.droppableId)
    nextLine.splice(startInfo.index, 1);
  nextLine.splice(endInfo.index, 0, removed);

  return { prevLine, nextLine };
};

export default { reorder };
