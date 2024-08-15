export const capitalizeFirstLetter = (string: string | null) => {
  return !string ? "" : string.charAt(0).toUpperCase() + string.slice(1);
};
