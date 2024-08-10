/**
 * The abstract base class for handling different types of input for image conversion.
 */
import CommandLine from '../input/command-line/command-line.js';
import Prompt from '../input/inquiry/prompt.js';
import FileManager from '../files/file-manager.js';

import { ILogger } from '../../output/logger.interface.js';
import { IImageInputData } from './image-handler/image-input-data.interface.js';


abstract class BaseHandler {
    /**
     * Instance of the CommandLine class for handling command line arguments.
     */
    protected commandLine: CommandLine = new CommandLine();

    /**
     * Instance of the FileManager class for managing files and directories.
     */
    protected fileManager: FileManager = new FileManager();

    /**
     * Instance of the Prompt class for handling user prompts and inquiries.
     */
    protected prompt: Prompt = new Prompt();

    /**
     * Constructor for the BaseHandler class.
     * @param inputType - The type of input (e.g., 'commandline', 'inquiry').
     * @param convertType - The type of conversion being handled by the subclass.
     * @param logger - The logger instance for logging messages.
     */
    constructor(protected inputType: string, protected convertType: string, protected logger: ILogger) { }

    /**
     * Abstract method to be implemented by subclasses for processing image conversion.
     * @returns A Promise resolving to void.
     */
    public abstract process(): Promise<void>;

    /**
     * Retrieves input data based on the input type (command line or inquiry).
     * @returns A Promise resolving to the input data required for image conversion.
     */
    protected async getInputData(): Promise<IImageInputData> {
        let inputData;

        switch (this.inputType) {
            case 'commandline':
                inputData = await this.getInputDataCL();
                break;
            case 'inquiry':
                inputData = await this.getInputDataInquire();
                break;
            default:
                throw new Error('Unsupported type of input.');
        }

        return inputData;
    }

    /**
     * Prepares the working directory for image conversion, ensuring the source folder exists and
     * copying files if necessary.
     * @param inputData - The input data for image conversion.
     * @returns A Promise resolving to the path of the working directory.
     * @throws Error if the source folder is incorrectly specified.
     */
    protected async prepareDir(inputData: IImageInputData): Promise<string> {
        const existsSource = await this.fileManager.doesDirectoryExist(inputData.source);
        if (!existsSource) {
            throw new Error('The folder for processing is incorrectly specified.');
        }

        if (!inputData.copy) {
            return inputData.source;
        }

        const processFolder = inputData.destination + '/' + inputData.source;
        await this.fileManager.createProcessDir(processFolder, this.logger);
        await this.fileManager.copyFolder(inputData.source, processFolder, this.logger, inputData.recursive);

        return processFolder;
    }

    /**
     * Abstract method to be implemented by subclasses for retrieving input data from the command line.
     * @returns A Promise resolving to the input data required for image conversion.
     */
    protected abstract getInputDataCL(): Promise<IImageInputData>;

    /**
     * Abstract method to be implemented by subclasses for retrieving input data through user prompts.
     * @returns A Promise resolving to the input data required for image conversion.
     */
    protected abstract getInputDataInquire(): Promise<IImageInputData>;
}

export default BaseHandler;
