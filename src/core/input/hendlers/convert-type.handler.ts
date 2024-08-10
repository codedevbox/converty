/**
 * ConvertTypeHandler class handling the selection of the conversion type based on input type (command line or inquiry).
 */
import { config } from '../../../config/config.js';
import CommandLine from '../command-line/command-line.js';
import Prompt from '../inquiry/prompt.js';

import { InquirerQuestion } from '../inquiry/prompt.interface.js';
import { CommandLineOption } from '../command-line/command-line.interface.js';

/**
 * Class representing the handler for selecting the conversion type based on input type.
 */
class ConvertTypeHandler {
    private commandLine: CommandLine = new CommandLine();
    private prompt: Prompt = new Prompt();

    /**
     * Gets the conversion type based on the input type.
     * @param inputType - The type of input ('commandline' or 'inquiry').
     * @returns A Promise resolving to the selected conversion type.
     * @throws {Error} If the input type is not supported or the selected conversion type is invalid.
     */
    async getConvertType(inputType: string): Promise<string> {
        let argument;
        switch (inputType) {
            case 'commandline':
                argument = await this.getConvertTypeCL();
                break;
            case 'inquiry':
                argument = await this.getConvertTypeInquire();
                break;
            default:
                throw new Error('Unsupported type of input.');
        }

        this.validateConvertType(argument);
        return argument;
    }

    /**
     * Gets the conversion type from the command line.
     * @returns A Promise resolving to the selected conversion type from the command line.
     */
    private async getConvertTypeCL(): Promise<string> {
        const option: CommandLineOption = {
            alias: 't',
            describe: 'Type of conversion',
            choices: config.convertTypes,
            string: true,
            default: 'images',
        };
        return await this.commandLine.getArg('type', option);
    }

    /**
     * Gets the conversion type using Inquirer prompts.
     * @returns A Promise resolving to the selected conversion type using Inquirer.
     */
    private async getConvertTypeInquire(): Promise<string> {
        const question: InquirerQuestion<'list'> = {
            type: 'list',
            name: 'type',
            message: 'Type of conversion',
            choices: config.convertTypes,
        };
        return await this.prompt.input<string>([question]);
    }

    /**
     * Validates the selected conversion type.
     * @param argument - The selected conversion type to validate.
     * @throws {Error} If the selected conversion type is not a string or is not in the supported types list.
     */
    private validateConvertType(argument: string): void {
        if (typeof argument !== 'string' || !config.convertTypes.includes(argument)) {
            throw new Error('Unsupported convert type.');
        }
    }
}

export default ConvertTypeHandler;
