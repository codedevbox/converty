import { Answers } from 'inquirer';
import { config } from '../../../config/config.js';

import { IInquirerQuestions } from '../../input/inquiry/prompt.interface.js';

/**
 * Array of inquirer questions for gathering input related to image conversion.
 */
export const imageQuestions: IInquirerQuestions[] = [
    {
        type: 'input',
        name: 'source',
        message: `Specify the source folder (default name '${config.defaultSourceImageFolder}')`,
        default: config.defaultSourceImageFolder,
        // Comments:
        // - The source folder for image conversion.
    },
    {
        type: 'confirm',
        name: 'recursive',
        message: 'Do you want to process the folder and all its contents?',
        default: false,
        // Comments:
        // - Option to process the folder and all its contents recursively.
    },
    {
        type: 'confirm',
        name: 'copy',
        message: 'Do you want to put result in a new folder?',
        default: false,
        // Comments:
        // - Option to copy the converted images to a new folder.
    },
    {
        type: 'input',
        name: 'destination',
        message: 'Specify the output folder (Only English letters, numbers, hyphens, and underscores are allowed.)',
        when: (answers: Answers) => answers.copy,
        default: config.defaultCopyFolder,
        // Comments:
        // - The output folder for storing converted images.
        // - Only applicable when the user chooses to copy the result to a new folder.
    },
    {
        type: 'confirm',
        name: 'overwrite',
        message: 'Overwrite the original file?',
        when: (answers: Answers) => answers.copy,
        default: config.overwriteOriginalFile,
        // Comments:
        // - Overwrite the original file or add a unique string to the optimized file name.
        // - Only applicable when the user chooses to copy the result to a new folder.
    },
    {
        type: 'list',
        name: 'from',
        message: `Specify which images to process (${config.validImageFormats.join(', ')})`,
        choices: ['all', ...config.validImageFormats],
        default: 'all',
        // Comments:
        // - Option to specify which images to process based on valid image formats.
        // - Allows choosing from 'all' or specific image formats.
    },
    {
        type: 'list',
        name: 'in',
        message: `Specify the formats to convert to (${config.imageConvertFormats.join(', ')})`,
        choices: ['all', ...config.imageConvertFormats],
        default: 'all',
        // Comments:
        // - Option to specify the formats to convert images into.
        // - Allows choosing from 'all' or specific image formats.
    },
    {
        type: 'input',
        name: 'qualityjpg',
        message: 'Specify quality jpg',
        default: config.qualityJpg.toString(),
        validate: (input: string) => {
            const numberValue = parseInt(input, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                return 'Please enter a number between 1 and 100';
            }
            return true;
        },
        // Comments:
        // - Option to specify the quality of the converted images to jpg.
        // - Validates input to ensure it is a number between 1 and 100.
    },
    {
        type: 'input',
        name: 'qualitypng',
        message: 'Specify quality png',
        default: config.qualityPng.toString(),
        validate: (input: string) => {
            const numberValue = parseInt(input, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                return 'Please enter a number between 1 and 100';
            }
            return true;
        },
        // Comments:
        // - Option to specify the quality of the converted images to png.
        // - Validates input to ensure it is a number between 1 and 100.
    },
    {
        type: 'input',
        name: 'qualitywebp',
        message: 'Specify quality webp',
        default: config.qualityWebp.toString(),
        validate: (input: string) => {
            const numberValue = parseInt(input, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                return 'Please enter a number between 1 and 100';
            }
            return true;
        },
        // Comments:
        // - Option to specify the quality of the converted images to webp.
        // - Validates input to ensure it is a number between 1 and 100.
    },
    {
        type: 'input',
        name: 'qualityavif',
        message: 'Specify quality avif',
        default: config.qualityAvif.toString(),
        validate: (input: string) => {
            const numberValue = parseInt(input, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                return 'Please enter a number between 1 and 100';
            }
            return true;
        },
        // Comments:
        // - Option to specify the quality of the converted images to avif.
        // - Validates input to ensure it is a number between 1 and 100.
    },
    {
        type: 'input',
        name: 'width',
        message: `Specify the width of the new image (e.g., 800). If preparing images with different widths, separate them by commas (e.g., 1200, 800, 400). Use a colon to indicate the suffix to be added at the end of the new file name (e.g., 1200:-b, 800:-m, 400:-s)`,
        default: 'no',
        // Comments:
        // - Option to specify the width of the new image or provide multiple widths.
        // - Allows adding suffixes to the new file names.
    },
    {
        type: 'input',
        name: 'height',
        message: `If necessary, specify the height of the new image (e.g., 800). If preparing images with different heights, separate them by commas (e.g., 1200, 800, 400). Use a colon to indicate the suffix to be added at the end of the new file name (e.g., 1200:-b, 800:-m, 400:-s).`,
        default: 'no',
        // Comments:
        // - Option to specify the height of the new image or provide multiple heights.
        // - Allows adding suffixes to the new file names.
    }
];
