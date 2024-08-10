/**
 * Interface representing options for a single command line argument.
 */
export interface CommandLineOption {
    alias?: string;
    describe?: string;
    choices?: string[];
    string?: boolean;
    default: string;
}

/**
 * Interface representing options for a list of command line arguments.
 */
export interface CommandLineListOptions {
    alias?: string;
    describe?: string;
    choices?: string[];
    string?: boolean;
    boolean?: boolean;
    number?: boolean;
    default?: string | boolean | number;
    coerce?: (arg: string) => number;
}

/**
 * Interface representing a collection of command line options.
 */
export interface CommandLineOptionsObject {
    [key: string]: CommandLineListOptions;
}
