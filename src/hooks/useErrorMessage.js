import { useCallback, useMemo, useState } from "react";
import { isVerification } from "../util";

const useErrorMessage = (selectItem, selectInfo, localStorage) => {
  const [errorMessage, setError] = useState("");

  const isError = useMemo(() => errorMessage.length > 1, [errorMessage]);

  const handleDragUpdate = useCallback(
    ({ source, destination }) => {
      if (!destination) return;

      const isMultiItem = selectInfo.count > 1;
      if (isVerification.isOddDropId(source, destination)) {
        setError(
          "첫 번째 칼럼에서 세 번째 칼럼으로는 아이템 이동이 불가능해야 합니다."
        );
      } else if (
        isVerification.isEvenDrop(
          source,
          destination,
          selectItem,
          localStorage,
          isMultiItem
        )
      ) {
        setError("짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.");
      } else {
        setError("");
      }
      return;
    },
    [selectInfo, localStorage, selectItem]
  );

  return { errorMessage, isError, handleDragUpdate };
};

export default useErrorMessage;
