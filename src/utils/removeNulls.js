export default function removeNulls(object) {
  return JSON.parse(JSON.stringify(object));
}