/**
 * ErrorHandler class responsible for handling uncaught exceptions and unhandled rejections.
 */
import { ILogger } from '../output/logger.interface.js';

/**
 * Class representing an error handler that logs and exits the process on uncaught exceptions or unhandled rejections.
 */
class ErrorHandler {
    private logger: ILogger;

    /**
     * Constructs an ErrorHandler instance with the provided logger.
     * @param logger - The logger used to log error messages.
     */
    constructor(logger: ILogger) {
        this.logger = logger;
        this.setupGlobalErrorHandler();
    }

    /**
     * Sets up global error handlers for uncaught exceptions and unhandled rejections.
     */
    private setupGlobalErrorHandler(): void {
        // Handle uncaught exceptions.
        process.on('uncaughtException', (error: Error) => {
            this.handleError(error);
        });

        // Handle unhandled rejections.
        process.on('unhandledRejection', (reason: unknown) => {
            if (reason instanceof Error) {
                this.handleError(reason);
            } else {
                // Create a new error for unhandled rejections without a specific reason.
                const error = new Error(reason?.toString() || 'Unhandled rejection with no reason');
                this.handleError(error);
            }
        });
    }

    /**
     * Logs the error message and exits the process with an error code.
     * @param error - The error object containing the error message.
     */
    private handleError(error: Error): void {
        this.logger.error(error.message);
        process.exit(1);
    }
}

export default ErrorHandler;
