/**
 * Generates a unique suffix using a random string.
 * @returns A string containing a unique suffix.
 */
const generateUniqueSuffix = (): string => Math.random().toString(36).substring(2, 7);

export default generateUniqueSuffix;
