export default function (
  currentRoute: string,
  meanings: { [key: string]: string }
) {
  const [, ...routes] = currentRoute.split("/");
  return routes.map((route) =>
    route
      .split("-")
      .map((piece) => {
        const meaning = meanings[piece];
        return meaning ? meaning : piece;
      })
      .join(" ")
  );
}
