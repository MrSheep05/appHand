export const capitilize = (text: string): string => {
  const [firsLetter, ...rest] = text;
  return firsLetter.toUpperCase() + rest.join("");
};
