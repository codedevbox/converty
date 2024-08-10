/**
 * Interface defining the structure for a LoggerHandler.
 * Specifies a method for handling log messages of different types.
 */
export interface ILoggerHandler {
    /**
     * Handles log messages of different types.
     * @param type - The type of the log message.
     * @param message - The log message to be handled.
     * @returns A Promise that resolves when the handling is complete (for asynchronous handlers).
     *          Returns void for synchronous handlers.
     */
    log(type: string, message: string): Promise<void> | void;
}
