/**
 * Configuration file for the application.
 */
import { Config } from './config.interface.js';

export const config: Config = {
    // Types of conversion supported by the application.
    convertTypes: ['images'],

    // Default type of conversion.
    defaultConvertTypes: 'images',

    // Default folder containing source images.
    defaultSourceImageFolder: 'images',

    // Default folder for storing converted/copy images.
    defaultCopyFolder: 'result',

    // Flag indicating whether recursive processing is enabled.
    recursiveProcessing: false,

    // Flag indicating whether recursive processing is enabled.
    overwriteOriginalFile: false,

    // Flag indicating whether to copy files to a new folder.
    copyToNewFolder: false,

    // Valid image formats for processing.
    validImageFormats: ['.jpg', '.jpeg', '.png'],

    // Image formats to which images will be converted.
    imageConvertFormats: ['.webp', '.avif', '.jpg', '.png'],

    // Specify quality.
    qualityJpg: 90,

    qualityPng: 90,

    qualityWebp: 90,

    qualityAvif: 90,

    // Methods for logging messages.
    logMethods: ['console', 'file'],

    // Path to the log file.
    logFilePath: 'log.txt',

    // Methods for logging success messages.
    successLogMethods: ['console'],

    // Methods for logging error messages.
    errorLogMethods: ['console', 'file'],

    // Methods for logging info messages.
    infoLogMethods: ['console'],
};
