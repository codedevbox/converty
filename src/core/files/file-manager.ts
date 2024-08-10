/**
 * FileManager class providing file and directory management functionality.
 */
import { promises } from 'fs';
import path from 'path';

import { ILogger } from '../../output/logger.interface.js';


/**
 * Class representing a file manager for handling file and directory operations.
 */
class FileManager {

    /**
     * Checks if a directory exists.
     * @param directoryName - The name of the directory to check.
     * @returns A Promise resolving to a boolean indicating whether the directory exists.
     */
    async doesDirectoryExist(directoryName: string): Promise<boolean> {
        try {
            const stats = await promises.stat(directoryName);
            return stats.isDirectory();
        } catch (error) {
            return false;
        }
    }

    /**
     * Creates a directory with recursive option.
     * @param directoryName - The name of the directory to create.
     * @param logger - The logger used to log messages.
     * @returns A Promise resolving after creating the directory.
     */
    async createProcessDir(directoryName: string, logger: ILogger): Promise<void> {
        try {
            await promises.mkdir(directoryName, { recursive: true });
        } catch (error) {
            logger.error(`Error creating directory: ${error}`);
        }
    }

    /**
     * Saves a converted file to the specified destination path.
     * @param destinationPath - The path where the converted file should be saved.
     * @param buffer - The buffer containing the file content.
     * @param extname - The file extension to be appended to the filename.
     * @param logger - The logger used to log messages.
     * @returns A Promise resolving after saving the file.
     */
    async saveConvertedFile(destinationPath: string, buffer: Buffer, extname: string, logger: ILogger, overwrite: boolean): Promise<void> {
        let baseName = path.parse(destinationPath).name;
        if(overwrite){
            baseName = baseName.replace(/^WORK-/, '');
        }
        const fileName = baseName + extname;
        const filePath = path.join(path.dirname(destinationPath), fileName);
        try {
            await promises.writeFile(filePath, buffer);
            logger.info(`Success converted: ${filePath}`);
        } catch (error) {
            logger.error(`Error converting: ${filePath}`);
        }
    }

    /**
     * Gets the name of a converted file based on the destination path and file extension.
     * @param destinationPath - The destination path of the file.
     * @param extname - The file extension to be appended to the filename.
     * @returns A Promise resolving to the full path of the converted file.
     */
    async getNameConvertedFile(destinationPath: string, extname: string, overwrite: boolean): Promise<string> {
        let baseName = path.parse(destinationPath).name;
        if(overwrite){
            baseName = baseName.replace(/^WORK-/, '');
        }
        const fileName = baseName + extname;
        const filePath = path.join(path.dirname(destinationPath), fileName);
        return filePath;
    }

    /**
     * Copies a folder from the source to the destination.
     * @param source - The source folder to copy.
     * @param destination - The destination folder to copy to.
     * @param logger - The logger used to log messages.
     * @param recursive - Flag indicating whether to copy the folder recursively.
     * @returns A Promise resolving after copying the folder.
     */
    async copyFolder(source: string, destination: string, logger: ILogger, recursive: boolean): Promise<void> {
        try {
            await promises.mkdir(destination, { recursive: true });

            const items = await promises.readdir(source);

            await Promise.all(items.map(async item => {
                const sourcePath = path.join(source, item);
                const destinationPath = path.join(destination, item);

                const stats = await promises.stat(sourcePath);

                if (stats.isDirectory()) {
                    if (recursive) {
                        await this.copyFolder(sourcePath, destinationPath, logger, recursive);
                    } else {
                        await promises.mkdir(destinationPath);
                    }
                } else {
                    await promises.copyFile(sourcePath, destinationPath);
                }
            }));

            logger.info('Copying completed successfully.');
        } catch (error) {
            logger.error('Error during copying: ' + error);
        }
    }

    /**
     * Deletes a file if it exists.
     * @param filePath - The path of the file to delete.
     * @param logger - The logger used to log messages.
     * @returns A Promise resolving after deleting the file.
     */
    async deleteFileIfExists(filePath: string, logger: ILogger) {
        try {
            if (await this.isExist(filePath)) {
                await promises.unlink(filePath);
            } else {
                logger.error(`File ${filePath} does not exist.`);
            }
        } catch (error) {
            logger.error(`Error deleting ${filePath}: ${error}`);
        }
    }

    async makeWorkFile(filePath: string, logger: ILogger): Promise<string | boolean>{
        try {
            const baseName = path.parse(filePath).name;
            const extension = path.extname(filePath);
            const newFileName = `WORK-${baseName}${extension}`;
            const outputPath = path.join(path.dirname(filePath), newFileName);
            await promises.copyFile(filePath, outputPath);
            return outputPath;
        } catch (error) {
            logger.error(`Error creating workfile ${filePath}: ${error}`);
        }
        return false;
    }

    /**
     * Checks if a file or directory exists.
     * @param path - The path to check.
     * @returns A Promise resolving to a boolean indicating whether the file or directory exists.
     */
    async isExist(path: string) {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    }
}

export default FileManager;
