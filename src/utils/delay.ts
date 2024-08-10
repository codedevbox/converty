/**
 * Helper function to introduce a delay using Promises.
 * @param ms - The duration of the delay in milliseconds (default is 500ms).
 * @returns A Promise that resolves after the specified delay.
 */
const delay = (ms: number = 500): Promise<void> => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default delay;
