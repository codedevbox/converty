/**
 * FileLogger class responsible for handling log messages and writing them to a file.
 * Implements the ILoggerHandler interface.
 */
import * as fs from 'fs';

import { config } from '../../config/config.js';
import { ILoggerHandler } from '../logger-handler.interface.js';

/**
 * Class representing a logger handler that writes log messages to a file.
 */
class FileLogger implements ILoggerHandler {
  private filePath = config.logFilePath;

  /**
   * Handles log messages by formatting and writing them to the configured log file.
   * @param type - The type of the log message.
   * @param message - The log message to be handled.
   */
  log(type: string, message: string): void {
    // Get the current date and time in a formatted string.
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    
    // Determine the formatted log type.
    const formattedType = ((type === 'success' || type === 'error') ? type : 'info').toUpperCase();
    
    // Construct the final log message.
    const logMessage = `[${formattedDate}] ${formattedType}: ${message}\n`;

    // Ensure the log file exists and write the log message to it.
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '');
    }

    fs.appendFileSync(this.filePath, logMessage);
  }
}

export default FileLogger;
