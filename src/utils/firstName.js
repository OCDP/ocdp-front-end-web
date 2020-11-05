export default function (fullName = "") {
  return `${fullName?.split(' ')?.shift()}`;
}