/**
 * Represents the input data required for the conversion process.
 */
export interface IInputData {
    /**
     * Type of the conversion process.
     * - Valid values are specified in the configuration file.
     */
    type: string;

    /**
     * Source folder for the conversion process.
     * - Default is the folder specified in the configuration file.
     */
    source: string;

    /**
     * Indicates whether to process the folder and its contents recursively.
     * - Option to process the folder and all its contents recursively.
     */
    recursive: boolean;

    /**
     * Indicates whether to copy the result to a new folder.
     * - Option to copy the converted images to a new folder.
     */
    copy: boolean;

    /**
     * Output folder for storing the converted images.
     * - Only applicable when the 'copy' property is true.
     * - The output folder for storing converted images.
     * - Only applicable when the user chooses to copy the result to a new folder.
     */
    destination: string;

    /**
     * Indicates overwrite original file or not.
     * - Option to owerwrite file.
     */
    overwrite: boolean;

    /**
     * Specifies which images to process based on valid image formats.
     * - Allows choosing from 'all' or specific image formats.
     * - Option to specify which images to process based on valid image formats.
     * - Allows choosing from 'all' or specific image formats.
     */
    from: string;

    /**
     * Specifies the formats to convert images into.
     * - Allows choosing from 'all' or specific image formats.
     * - Option to specify the formats to convert images into.
     * - Allows choosing from 'all' or specific image formats.
     */
    in: string;
}
