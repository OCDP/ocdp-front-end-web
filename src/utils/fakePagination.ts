export default function <T>(list: T[], currentPage = 1, pageSize = 10) {
  return list.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}