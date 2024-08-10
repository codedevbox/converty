/**
 * Class responsible for converting images to different formats and resolutions.
 */
import path from 'path';
import { promises } from 'fs';
import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminAvif from 'imagemin-avif';
import imageminPngquant from 'imagemin-pngquant';

import { config } from '../../../config/config.js';
import processInput from '../../../utils/parseResolution.js';
import FileManager from '../../files/file-manager.js';

import { ILogger } from '../../../output/logger.interface.js';
import { IImageInputData } from './image-input-data.interface.js';
import generateUniqueSuffix from '../../../utils/generateUniqueSuffix.js';


class ImageConverter {
    protected fileManager: FileManager = new FileManager();

    /**
     * Initializes the ImageConverter class.
     * @param inputData - The input data for image conversion.
     * @param logger - The logger for logging messages.
     */
    constructor(private inputData: IImageInputData, private logger: ILogger) { }

    /**
     * Processes files in the specified directory, converting them based on the input data.
     * @param processDir - The directory containing the files to be processed.
     * @returns A Promise that resolves when all files are processed.
     */
    async processFiles(processDir: string): Promise<void> {
        try {
            const files = await promises.readdir(processDir);

            for (const file of files) {
                const filePath = path.join(processDir, file);
                const stats = await promises.stat(filePath);

                if (stats.isDirectory()) {
                    if (this.inputData.recursive) {
                        await this.processFiles(filePath);
                    }
                } else {
                    const fileExt = path.extname(filePath).toLowerCase();
                    const isValidFile = (this.inputData.from === 'all' || fileExt === this.inputData.from) &&
                        config.validImageFormats.includes(fileExt);
                    if (!isValidFile) { continue; }

                    if(this.inputData.overwrite){
                        const newFilePath = await this.fileManager.makeWorkFile(filePath, this.logger);
                        if (typeof newFilePath === 'string' && newFilePath.trim() !== "") {
                            await this.fileManager.deleteFileIfExists(filePath, this.logger);
                            await this.chooseResolution(newFilePath);
                            await this.fileManager.deleteFileIfExists(newFilePath, this.logger);
                        } 
                    }
                    else{
                        await this.chooseResolution(filePath);
                    }
                }
            }
        } catch (error) {
            this.logger.error('Error reading folder:' + error);
        }
    }

    /**
     * Chooses the appropriate resolution for the image and initiates the conversion process.
     * @param filePath - The path to the image file.
     * @returns A Promise that resolves when the image is processed.
     */
    protected async chooseResolution(filePath: string): Promise<void> {
        let title = '';
        let resolutionLen = 0;

        if (this.inputData.width !== 'no') {
            const widthList = await processInput(this.inputData.width);
            if (widthList) {
                resolutionLen = widthList.length;
                for (const item of widthList) {
                    title = (resolutionLen > 1) ? item.title || '' : '';
                    await this.chooseFormats(filePath, 'width', item.resolution, title, resolutionLen);
                }
            }
        } else if (this.inputData.height !== 'no') {
            const heightList = await processInput(this.inputData.height);
            if (heightList) {
                resolutionLen = heightList.length;
                for (const item of heightList) {
                    title = (resolutionLen > 1) ? item.title || '' : '';
                    await this.chooseFormats(filePath, 'height', item.resolution, title, resolutionLen);
                }
            }
        } else {
            await this.chooseFormats(filePath, '', 0, '', 0);
        }
    }

    /**
     * Chooses the appropriate image formats for conversion and initiates the conversion process.
     * @param filePath - The path to the image file.
     * @param size - The dimension ('width' or 'height') to be considered during conversion.
     * @param value - The value of the dimension.
     * @param suffix - The suffix to be added to the converted file name.
     * @param lengthList - The number of resolutions in the list.
     * @returns A Promise that resolves when the image is processed.
     */
    protected async chooseFormats(filePath: string, size: string, value: number, suffix: string, lengthList: number): Promise<void> {
        if (this.inputData.in === 'all') {
            await this.convertImage('.webp', filePath, size, value, suffix, lengthList);
            await this.convertImage('.avif', filePath, size, value, suffix, lengthList);
            await this.convertImage('.jpg', filePath, size, value, suffix, lengthList);
            await this.convertImage('.png', filePath, size, value, suffix, lengthList);
        } else if (config.imageConvertFormats.includes(this.inputData.in)) {
            switch (this.inputData.in) {
                case '.webp':
                    await this.convertImage('.webp', filePath, size, value, suffix, lengthList);
                    break;
                case '.avif':
                    await this.convertImage('.avif', filePath, size, value, suffix, lengthList);
                    break;
                case '.jpg':
                    await this.convertImage('.jpg', filePath, size, value, suffix, lengthList);
                    break;
                case '.png':
                    await this.convertImage('.png', filePath, size, value, suffix, lengthList);
                    break;
            }
        }
    }

    /**
     * Converts the image to the specified format and resolution.
     * @param type - The target format of the converted image.
     * @param processFile - The path to the image file.
     * @param size - The dimension ('width' or 'height') to be considered during conversion.
     * @param value - The value of the dimension.
     * @param suffix - The suffix to be added to the converted file name.
     * @param lengthList - The number of resolutions in the list.
     * @returns A Promise that resolves when the image is processed.
     */
    protected async convertImage(type: string, processFile: string, size: string, value: number, suffix: string, lengthList: number): Promise<void> {
        let ext = type;
        let workFile = processFile;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let plugins: any[] = [];

        try {
            if (value > 10 && value < 2000) {
                workFile = await this.resizeImage(processFile, size, value);
                if (lengthList > 1) {
                    ext = (suffix && suffix.trim() !== '' ? suffix.trim() : '-' + String(value)) + type;
                }
            }

            switch (type) {
                case '.webp':
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    plugins = [(imageminWebp as any)({ quality: +this.inputData.qualitywebp, }),];
                    break;
                case '.avif':
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    plugins = [(imageminAvif as any)({ quality: +this.inputData.qualityavif, }),];
                    break;
                case '.png': {
                    const minQuality = this.inputData.qualitypng / 100;
                    const maxQuality = Math.min((Math.ceil(this.inputData.qualitypng / 10) * 10) / 100, 1.0);
                    plugins = [
                        imageminPngquant({
                            quality: [minQuality, maxQuality],
                            speed: 1
                        })
                    ];
                    break;
                }
                case '.jpg':
                case '.jpeg': {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const quality = +this.inputData.qualityjpg;
                    let outputPath = await this.fileManager.getNameConvertedFile(processFile, ext, this.inputData.overwrite);

                    if (workFile === outputPath) {
                        const uniqueSuffix = generateUniqueSuffix();
                        const baseName = path.parse(workFile).name;
                        const extension = path.extname(workFile);
                        const newFileName = `${baseName}-${uniqueSuffix}${extension}`;
                        outputPath = path.join(path.dirname(processFile), newFileName);
                    }

                    await this.compressImage(workFile, outputPath, quality);
                    this.logger.info(`Success converted: ${outputPath}`);
                    if (value > 10 && value < 2000) {
                        await this.fileManager.deleteFileIfExists(workFile, this.logger);
                    }
                    return;
                }
            }

            const fileExtension = path.extname(workFile).toLowerCase();
            if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
                plugins.push(imageminJpegtran());
            }

            const buffer = await imagemin.buffer(await promises.readFile(workFile), {
                plugins,
            });

            await this.fileManager.saveConvertedFile(processFile, buffer, ext, this.logger, this.inputData.overwrite);
            if (value !== 0) {
                await this.fileManager.deleteFileIfExists(workFile, this.logger);
            }
        } catch (error) {
            this.logger.error(`Error during '${type}' conversion: ${error}`);
        }
    }

    /**
     * Compresses the image using the sharp library.
     * @param inputPath - The path to the input image file.
     * @param outputPath - The path to save the compressed image.
     * @param quality - The quality parameter for image compression.
     * @returns A Promise that resolves when the image is compressed.
     */
    private async compressImage(inputPath: string, outputPath: string, quality: number): Promise<void> {
        try {
            await sharp(inputPath)
                .jpeg({ quality: quality })
                .toFile(outputPath);
        } catch (error) {
            throw new Error(`Error during image compression: ${error}`);
        }
    }

    /**
     * Resizes the image based on the specified dimension and value.
     * @param processFile - The path to the image file.
     * @param size - The dimension ('width' or 'height') to be considered during resizing.
     * @param value - The value of the dimension.
     * @returns A Promise that resolves with the path to the resized image.
     */
    protected async resizeImage(processFile: string, size: string, value: number): Promise<string> {
        const fileExtension = path.extname(processFile).toLowerCase();
        const tempfileName = path.parse(processFile).name + '_' + [size] + '_' + value + fileExtension;
        const tempFilePath = path.join(path.dirname(processFile), tempfileName);
        await sharp(processFile).resize({ [size]: value }).toFile(tempFilePath);
        return tempFilePath;
    }
}

export default ImageConverter;
