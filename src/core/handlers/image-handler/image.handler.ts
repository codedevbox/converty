/**
 * Class representing the handling of image conversion.
 * Extends the base handler for common functionality.
 */
import BaseHandler from '../base.handler.js';
import { imageInputOptions } from './image-input.js';
import { imageQuestions } from './image-inquiry.js';
import { ILogger } from '../../../output/logger.interface.js';
import { IImageInputData } from './image-input-data.interface.js';
import { IInquirerQuestions } from '../../input/inquiry/prompt.interface.js';
import ImageConverter from './image-converter.js';


class ImageHandler extends BaseHandler {

    /**
     * Constructs an instance of the ImageHandler class.
     * @param inputType - The type of input (commandline or inquiry).
     * @param convertType - The type of conversion (images or video).
     * @param logger - The logger instance for logging.
     */
    constructor(inputType: string, convertType: string, logger: ILogger) {
        super(inputType, convertType, logger);
    }

    /**
     * Processes the image conversion based on user input.
     * @returns A Promise resolving when the conversion process is complete.
     */
    public async process(): Promise<void> {
        try {
            const inputData = await this.getImageInputData();
            const processDir = await this.prepareDir(inputData);
            const converter = new ImageConverter(inputData, this.logger);
            await converter.processFiles(processDir);
        } catch (error) {
            this.logger.error(`Error during image conversion process: ${error}`);
        }
    }

    /**
     * Gets the input data specific to image conversion.
     * @returns A Promise resolving to the image input data.
     */
    protected async getImageInputData(): Promise<IImageInputData> {
        return await this.getInputData() as IImageInputData;
    }

    /**
     * Gets the image input data from the command line.
     * @returns A Promise resolving to the image input data.
     */
    async getInputDataCL(): Promise<IImageInputData> {
        const options = imageInputOptions;
        return await this.commandLine.getAllArg<IImageInputData>(options);
    }

    /**
     * Gets the image input data through user prompts.
     * @returns A Promise resolving to the image input data.
     */
    async getInputDataInquire(): Promise<IImageInputData> {
        const questions: IInquirerQuestions[] = imageQuestions;
        return await this.prompt.inputAll(questions);
    }

}

export default ImageHandler;
