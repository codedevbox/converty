import { IInputData } from '../input-data.interface.js';

/**
 * Interface representing input data specific to image conversion.
 * Extends the general IInputData interface.
 */
export interface IImageInputData extends IInputData {
    /**
     * Quality setting for the image conversion process.
     */
    qualityjpg: number;

    /**
     * Quality setting for the image conversion process.
     */
    qualitypng: number;

    /**
     * Quality setting for the image conversion process.
     */
    qualitywebp: number;

    /**
     * Quality setting for the image conversion process.
     */
    qualityavif: number;

    /**
     * Width of the new image or a comma-separated list of widths for multiple resolutions.
     */
    width: string;

    /**
     * Height of the new image or a comma-separated list of heights for multiple resolutions.
     */
    height: string;
}

/**
 * Interface representing an object containing resolution information.
 */
export interface IResolutionObject {
    /**
     * The resolution value.
     */
    resolution: number;

    /**
     * Optional title or suffix associated with the resolution.
     */
    title?: string;
}
