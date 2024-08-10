/**
 * ConsoleLogger class responsible for handling log messages and displaying them in the console.
 * Implements the ILoggerHandler interface.
 */
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import delay from '../../utils/delay.js';

import { ILoggerHandler } from '../logger-handler.interface.js';

/**
 * Class representing a logger handler that displays log messages in the console.
 */
class ConsoleLogger implements ILoggerHandler {
    /**
     * Asynchronously handles log messages by formatting and displaying them in the console.
     * @param type - The type of the log message.
     * @param message - The log message to be handled.
     */
    async log(type: string, message: string): Promise<void> {
        if (type === 'animate') {
            // Handle animated messages using chalk-animation library.
            const title = chalkAnimation.rainbow(message);
            await delay();
            title.stop();
        } else if (type === 'title') {
            // Handle title messages with a blue background.
            console.log(chalk.bgBlueBright(` ${message} \n`));
        } else {
            // Handle regular log messages with different colored backgrounds based on type.
            let prefix = '';
            switch (type) {
                case 'info':
                    prefix = chalk.bgBlueBright(' INFO ') + ' ';
                    break;
                case 'success':
                    prefix = chalk.bgGreenBright(' SUCCESS ') + ' ';
                    break;
                case 'error':
                    prefix = chalk.bgRedBright(' ERROR ') + ' ';
                    break;
            }
            console.log(prefix + message);
        }
    }
}

export default ConsoleLogger;
