export default function (gender = "", type = "") {
  switch (type) {
    case "dr":
      return `${gender === "f" ? "Dra." : "Dr."}`;
    case "genero":
      if (!gender) {
        return "Desconhecido"
      }
      return `${gender === "f" ? "Feminino" : "Masculino"}`;
    default:
      return `${gender === "f" ? "a" : "o"}`;
  }
}
