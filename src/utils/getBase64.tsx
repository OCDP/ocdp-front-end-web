export default (img: any) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.addEventListener("error", reject);
  });
};
