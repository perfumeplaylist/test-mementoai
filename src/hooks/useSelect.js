import { useMemo, useState } from "react";

const useSelect = () => {
  const [selectedItem, setSelectedItem] = useState({
    items: [],
    droppableId: null,
  });

  const selectInfo = useMemo(() => {
    return {
      isSelected: (id) => {
        return Boolean(
          selectedItem.items.some(({ id: itemId }) => itemId === id)
        );
      },
      count: selectedItem.items.length,
    };
  }, [selectedItem]);

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

  return { selectedItem, setSelectedItem, selectInfo, toggleSelectedItem };
};

export default useSelect;
