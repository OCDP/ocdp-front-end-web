type FormaterType = "cpf" | "cnpj" | "cep" | "tel" | "real" | "bytes";

export default function (value = "", type: FormaterType) {
  switch (type) {
    case "cpf":
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    case "cnpj":
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );

    case "cep":
      return value.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");

    case "tel":
      switch (value.length) {
        case 11:
          return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
        case 10:
          return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        case 9:
          return value.replace(/(\d{1})(\d{4})(\d{4})/, "$1 $2-$3");
        case 8:
          return value.replace(/(\d{4})(\d{4})/, "$1-$2");
        default:
          return value;
      }

    case "real":
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(+value);

    case "bytes":
      const bytes = +value;
      if (bytes === 0) return "0 Bytes";
      const kilo = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const exponent = Math.floor(Math.log(bytes) / Math.log(kilo));
      return `${parseFloat((bytes / Math.pow(kilo, exponent)).toFixed(2))} ${
        sizes[exponent]
      }`;

    default:
      return value;
  }
}

export const unformat = (formattedWord: string) => {
  return formattedWord
    .replace(/[.]/gi, "")
    .replace(/[-]/gi, "")
    .replace(/[_]/gi, "")
    .replace(/[/]/gi, "")
    .replace(/[(]/gi, "")
    .replace(/[)]/gi, "")
    .replace(/[ ]/gi, "");
};
