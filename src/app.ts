/**
 * Entry point for the application.
 * Creates instances of Logger, ErrorHandler, and Executor to run the application.
 */
import Logger from './output/logger.js';
import ErrorHandler from './utils/error-handler.js';
import Executor from './core/executor/executor.js';

import { ILogger } from './output/logger.interface.js';

/**
 * Main class representing the application.
 */
export class App {
    /**
     * Asynchronous method to start the application.
     */
    async run() {
        // Initialize Logger instance with ILogger type.
        const logger: ILogger = new Logger().getInstance();

        // Set up ErrorHandler with the provided Logger.
        new ErrorHandler(logger);

        // Execute the main functionality through Executor.
        await new Executor(logger).execute();
    }
}

// Create an instance of the App class and run the application.
const app = new App();
app.run();
