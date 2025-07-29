export const addElipsis = (text) => {
  if (!text) return ""; // prevent undefined errors
  return text.length > 50 ? text.substring(0, 50) + "..." : text;
};
