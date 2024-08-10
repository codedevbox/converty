/**
 * Factory class for creating specific handlers based on the conversion type.
 */
import BaseHandler from './base.handler.js';
import ImageHandler from './image-handler/image.handler.js';

import { ILogger } from '../../output/logger.interface.js';

class HandlerFactory {
    /**
     * Creates a specific handler based on the provided conversion type.
     *
     * @static
     * @param {string} inputType - The type of input (e.g., 'commandline', 'inquiry').
     * @param {string} convertType - The type of conversion (e.g., 'images').
     * @param {ILogger} logger - The logger instance for handling logs.
     * @returns {BaseHandler} An instance of the specific handler for the given conversion type.
     * @throws {Error} If the provided conversion type is not supported.
     */
    static createHandler(inputType: string, convertType: string, logger: ILogger): BaseHandler {
        switch (convertType) {
            case 'images':
                return new ImageHandler(inputType, convertType, logger);
            default:
                throw new Error(`Unsupported type of input.`);
        }
    }
}

export default HandlerFactory;
