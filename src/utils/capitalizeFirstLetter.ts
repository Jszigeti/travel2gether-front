export const capitalizeFirstLetters = (s: string) => {
  return s
    .split(/([ -])/g)
    .map((part) => {
      if (part === "-" || part === " ") {
        return part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");
};

export const capitalizeFirstFieldLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
