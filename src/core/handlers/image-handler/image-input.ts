import { config } from '../../../config/config.js';

import { CommandLineOptionsObject } from '../../input/command-line/command-line.interface.js';

/**
 * Command-line options specific to image conversion.
 */
export const imageInputOptions: CommandLineOptionsObject = {
    type: {
        alias: 't',
        describe: 'Type of conversion (images)',
        choices: config.convertTypes,
        string: true,
        default: config.defaultConvertTypes,
    },
    source: {
        alias: 's',
        describe: 'Specify the source folder',
        string: true,
        default: config.defaultSourceImageFolder,
    },
    recursive: {
        alias: 'r',
        describe: 'Specify if you want to process the folder and all its contents.',
        boolean: true,
        default: false,
    },
    copy: {
        alias: 'c',
        describe: 'Specify if you want to put the result in a new folder.',
        boolean: true,
        default: false,
    },
    destination: {
        alias: 'd',
        describe: 'Specify the output folder (Only English letters, numbers, hyphens, and underscores are allowed.).',
        string: true,
        default: config.defaultCopyFolder,
    },
    overwrite: {
        alias: 'o',
        describe: 'Overwrite the original file',
        boolean: true,
        default: false,
    },
    from: {
        alias: 'f',
        describe: `Specify which images to process (${config.validImageFormats.join(', ')})`,
        choices: ['all', ...config.validImageFormats],
        string: true,
        default: 'all',
    },
    in: {
        alias: 'i',
        describe: `Specify the formats to convert to (${config.imageConvertFormats.join(', ')})`,
        choices: ['all', ...config.imageConvertFormats],
        string: true,
        default: 'all',
    },
    qualityjpg: {
        alias: 'qjpg',
        describe: 'Specify quality for jpg.',
        number: true,
        coerce: (arg) => {
            const numberValue = parseInt(arg, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                throw new Error('Quality must be a number between 1 and 100');
            }
            return numberValue;
        },
        default: config.qualityJpg,
    },
    qualitypng: {
        alias: 'qpng',
        describe: 'Specify quality for png.',
        number: true,
        coerce: (arg) => {
            const numberValue = parseInt(arg, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                throw new Error('Quality must be a number between 1 and 100');
            }
            return numberValue;
        },
        default: config.qualityPng,
    },
    qualitywebp: {
        alias: 'qwebp',
        describe: 'Specify quality for webp.',
        number: true,
        coerce: (arg) => {
            const numberValue = parseInt(arg, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                throw new Error('Quality must be a number between 1 and 100');
            }
            return numberValue;
        },
        default: config.qualityWebp,
    },
    qualityavif: {
        alias: 'qavif',
        describe: 'Specify quality for avif.',
        number: true,
        coerce: (arg) => {
            const numberValue = parseInt(arg, 10);
            if (isNaN(numberValue) || numberValue < 1 || numberValue > 100) {
                throw new Error('Quality must be a number between 1 and 100');
            }
            return numberValue;
        },
        default: config.qualityAvif,
    },
    width: {
        alias: 'w',
        describe: `Specify the width of the new image (e.g., 800). If preparing images with different widths, separate them by commas (e.g., 1200, 800, 400). Use a colon to indicate the suffix to be added at the end of the new file name (e.g., 1200:-b, 800:-m, 400:-s)`,
        string: true,
        default: 'no',
    },
    height: {
        alias: 'he',
        describe: `If necessary, specify the height of the new image (e.g., 800). If preparing images with different heights, separate them by commas (e.g., 1200, 800, 400). Use a colon to indicate the suffix to be added at the end of the new file name (e.g., 1200:-b, 800:-m, 400:-s).`,
        string: true,
        default: 'no',
    }
};
