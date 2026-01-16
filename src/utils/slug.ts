/**
 * Slugify a string
 */
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")               // separate accents
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/&/g, "og")            // optional Danish fix
    .replace(/[^a-z0-9]+/g, "-")   // replace spaces and special chars with "-"
    .replace(/(^-|-$)/g, "");      // trim leading/trailing "-"
};