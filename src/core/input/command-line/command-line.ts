/**
 * CommandLine class for handling command line arguments using yargs.
 */
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { CommandLineOption, CommandLineOptionsObject } from './command-line.interface.js';

/**
 * Class representing the handling of command line arguments using yargs.
 */
class CommandLine {
    /**
     * Gets the value of a single command line argument.
     * @param argumentName - The name of the argument.
     * @param option - Options for the argument (e.g., alias, describe, choices, string, default).
     * @returns A Promise resolving to the value of the specified command line argument.
     * @throws {Error} If the argument is not provided or the input type is unsupported.
     */
    public async getArg(argumentName: string, option: CommandLineOption): Promise<string> {
        const argv = await yargs(process.argv.slice(2))
            .strict(false)
            .showHelpOnFail(true)
            .option(argumentName, option)
            .help()
            .fail(() => {
                throw new Error('Unsupported type of input.');
            })
            .parse();

        return argv[argumentName];
    }

    /**
     * Gets the values of multiple command line arguments.
     * @param options - Options for multiple arguments (e.g., alias, describe, choices, string, default).
     * @returns A Promise resolving to an object containing the values of the specified command line arguments.
     */
    public async getAllArg<T>(options: CommandLineOptionsObject): Promise<T> {
        const argv = await yargs(hideBin(process.argv))
                    .usage('Usage: $0 <command> [options]')
                    .options(options)
                    .alias('h', 'help')
                    .help('help')
                    .version()
                    .strict()
                    .showHelpOnFail(true, 'Specify --help for available options')
                    .parse();

        const result: Record<string, unknown> = {};

        Object.keys(options).forEach((key) => {
            if (argv[key] !== undefined) {
                result[key] = argv[key];
            }
        });

        return result as T;
    }
}

export default CommandLine;
