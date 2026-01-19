const charMap: Record<string, string> = {
  æ: "ae",
  ø: "o",
  å: "a"
};

/**
 * Slugify a string
 */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[æøå]/g, m => charMap[m])
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "og")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");