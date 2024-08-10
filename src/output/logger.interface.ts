/**
 * Interface defining the structure for a Logger.
 * Specifies methods for logging various types of messages.
 */
export interface ILogger {
    /**
     * Logs an information message.
     * @param message - The information message to be logged.
     */
    info(message: string): void;

    /**
     * Logs a success message.
     * @param message - The success message to be logged.
     */
    success(message: string): void;

    /**
     * Logs an error message.
     * @param message - The error message to be logged.
     */
    error(message: string): void;

    /**
     * Asynchronously logs an animated message.
     * @param message - The animated message to be logged.
     * @returns A Promise that resolves when the animation is complete.
     */
    animate(message: string): Promise<void>;

    /**
     * Logs a text message.
     * @param message - The text message to be logged.
     */
    text(message: string): void;

    /**
     * Logs a title message.
     * @param message - The title message to be logged.
     */
    title(message: string): void;
}
