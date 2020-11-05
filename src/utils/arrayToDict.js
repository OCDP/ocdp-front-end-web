export default function (array = []) {
  return array.reduce((dict, { key, value }) => {
    dict[key] = value;
    return dict;
  }, {});
}

export function revert(dict = {}) {
  return Object.entries(dict).reduce(
    (array, [key, value]) => [...array, { key, value }],
    []
  );
}
