/**
 * Interface describing the structure of the configuration file.
 */
export interface Config {
    convertTypes: string[];
    defaultConvertTypes: string;
    defaultSourceImageFolder: string;
    defaultCopyFolder: string;
    recursiveProcessing: boolean;
    overwriteOriginalFile: boolean;
    copyToNewFolder: boolean;
    validImageFormats: string[];
    imageConvertFormats: string[];
    qualityJpg: number;
    qualityPng: number;
    qualityWebp: number;
    qualityAvif: number;
    logMethods: string[];
    logFilePath: string;
    successLogMethods: string[];
    errorLogMethods: string[];
    infoLogMethods: string[];
}
