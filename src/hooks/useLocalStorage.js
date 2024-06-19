import { useState, useEffect } from "react";
import { localStorage as storage } from "../util";

const useLocalStorage = (key) => {
  const [localStorage, setLocalStorage] = useState(storage.get(key));

  useEffect(() => {
    storage.set(key, { ...localStorage });
  }, [localStorage]);

  return [localStorage, setLocalStorage];
};

export default useLocalStorage;
