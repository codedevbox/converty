/**
 * Logger class for handling logging functionality.
 * Implements ILogger interface to define logging methods.
 */
import ConsoleLogger from './console-logger/console-logger.js';
import FileLogger from './file-logger/file-logger.js';
import { config } from '../config/config.js';

import { ILogger } from './logger.interface.js';
import { ILoggerHandler } from './logger-handler.interface.js';

/**
 * Singleton Logger class providing logging functionality.
 * Uses ConsoleLogger and FileLogger as default handlers.
 */
class Logger implements ILogger {
    private static instance: Logger;
    private handlers: Record<string, ILoggerHandler> = {};

    /**
     * Constructs a Logger instance and sets up default handlers.
     */
    constructor() {
        this.addHandler('console', new ConsoleLogger());
        this.addHandler('file', new FileLogger());
    }

    /**
     * Retrieves the singleton instance of Logger.
     * @returns The Logger instance.
     */
    public getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Adds a logging handler to the Logger.
     * @param key - Unique key for the handler.
     * @param handler - Logger handler implementing ILoggerHandler interface.
     */
    addHandler(key: string, handler: ILoggerHandler): void {
        this.handlers[key] = handler;
    }

    /**
     * Logs an information message.
     * @param message - The information message.
     */
    info(message: string): void {
        this.log('info', message);
    }

    /**
     * Logs a success message.
     * @param message - The success message.
     */
    success(message: string): void {
        this.log('success', message);
    }

    /**
     * Logs an error message.
     * @param message - The error message.
     */
    error(message: string): void {
        this.log('error', message);
    }

    /**
     * Asynchronously logs an animated message.
     * @param message - The animated message.
     */
    async animate(message: string): Promise<void> {
        await this.log('animate', message);
    }

    /**
     * Logs a text message.
     * @param message - The text message.
     */
    text(message: string): void {
        this.log('text', message);
    }

    /**
     * Logs a title message.
     * @param message - The title message.
     */
    title(message: string): void {
        this.log('title', message);
    }

    /**
     * Private method to log messages based on type and configured log methods.
     * @param type - The type of log message.
     * @param message - The log message.
     */
    private async log(type: string, message: string) {
        Object.keys(this.handlers).forEach(async (key) => {
            const handler = this.handlers[key];
            switch (type) {
                case 'success':
                    if (config.successLogMethods.includes(key)) {
                        handler.log(type, message);
                    }
                    break;
                case 'error':
                    if (config.errorLogMethods.includes(key)) {
                        handler.log(type, message);
                    }
                    break;
                case 'animate':
                    if (config.infoLogMethods.includes(key)) {
                        await handler.log(type, message);
                    }
                    break;
                default:
                    if (config.infoLogMethods.includes(key)) {
                        handler.log(type, message);
                    }
            }
        });
    }
}

export default Logger;
