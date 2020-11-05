export default function (sleep = 0) {
  localStorage.clear();
  setTimeout(() => window.location.reload(), sleep);
}
