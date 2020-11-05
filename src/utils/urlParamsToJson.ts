export default function <T extends Object>(urlParams = "") {
  return decodeURIComponent(urlParams)
    .split("&")
    .reduce((json, param) => {
      const [key, value] = param.split("=");
      //@ts-ignore
      json[key] = value;
      return json;
    }, {} as T);
}
