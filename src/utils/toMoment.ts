import moment from "moment";

export default function (hora: string) {
  const date = moment();
  const [hh, mm] = hora.split(":");

  date.set("milliseconds", 0);
  date.set("seconds", 0);
  date.set("minutes", +mm);
  date.set("hours", +hh);

  return date;
}
