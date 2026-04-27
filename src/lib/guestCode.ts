/**
 * Generate a random code based on a name  
 * @param name - string
 * @param prefixLength - default value 3
 * @returns string
 */
export const generateCode = (name: string, prefixLength: number = 3): string => {
    const names = name.trim().toUpperCase().split(" ")
    let prefix = names.reduce((acc, current) => acc + current.slice(0, 1), "");

    while (prefix.length < prefixLength) {
        prefix += names[names.length - 1].slice(prefix.length - 1, prefix.length);
    }

    const timeStamp = timeBucket();
    const number = randomPart();

    return `${prefix}-${timeStamp}${number}`;
}

const timeBucket = () => {
  return (Math.floor(Date.now() / 1000) % 46656)
    .toString(36)
    .padStart(3, "0");
};

const randomPart = (length: number = 3) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  return Array.from(array)
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, length);
};