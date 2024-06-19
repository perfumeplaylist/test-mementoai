let cnt = 0;

const getItems = (count) =>
  Array.from({ length: count }, () => cnt++).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const localStorage = {
  get: (key) => {
    try {
      const getValue = JSON.parse(window.localStorage.getItem(key)) || {
        line1: getItems(5),
        line2: getItems(3),
        line3: getItems(4),
        line4: getItems(10),
      };
      return getValue;
    } catch (e) {
      throw new Error("local에 저장하는데 실패했습니다.");
    }
  },
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error("local에 저장하는데 실패했습니다.");
    }
  },
};

export default localStorage;
