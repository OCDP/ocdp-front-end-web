export default function <T extends Object>(params: T) {
  return Object.entries(params).map(param => param.join('=')).join('&');
}