const myCategory = [
  { value: "JS" },
  { value: "JAVA" },
  { value: "电影" },
  { value: "找工作" },
  { value: "摄影" },
];

const unique = (arr, key) => {
  if (!arr) return arr;
  if (key === undefined) return [...new Set(arr)];
  const map = {
    string: (e) => e[key],
    function: (e) => key(e),
  };
  const fn = map[typeof key];
  const obj = arr.reduce((o, e) => ((o[fn(e)] = e), o), {});
  return Object.values(obj);
}

export {myCategory, unique}