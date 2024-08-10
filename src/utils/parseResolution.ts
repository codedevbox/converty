/**
 * Processes input data for image resolutions.
 * @param data - Input data containing image resolutions.
 * @returns An array of IResolutionObject representing processed resolutions.
 * @throws {Error} If the input data is invalid or does not meet the specified criteria.
 */
import { IResolutionObject } from '../core/handlers/image-handler/image-input-data.interface.js';

const processInput = async (data: string): Promise<IResolutionObject[]> => {
    const result: IResolutionObject[] = [];

    if (!data.includes(',')) {
        // Case 1: No commas, single resolution
        const resolution = parseInt(data.trim(), 10);

        if (isNaN(resolution) || resolution < 5 || resolution > 2000) {
            throw new Error('Width value should be a number between 5 and 2000');
        }

        result.push({ resolution });
    } else {
        // Case 2: Multiple resolutions
        const resolutions = data.split(',').map((item) => {
            const [resolutionStr, titleStr] = item.split(':').map((part) => part.trim());
            return { resolutionStr, titleStr };
        });

        for (const { resolutionStr, titleStr } of resolutions) {
            if (titleStr) {
                // Case 3: Resolution with title
                const resolution = parseInt(resolutionStr, 10);

                if (isNaN(resolution) || resolution < 5 || resolution > 2000) {
                    throw new Error('Width value should be a number between 5 and 2000');
                }

                if (!/^[a-zA-Z-]+$/.test(titleStr)) {
                    throw new Error('Suffix should contain only letters and hyphen');
                }

                result.push({ resolution, title: titleStr });
            } else {
                // Case 4: Resolution without title
                const resolution = parseInt(resolutionStr, 10);

                if (isNaN(resolution) || resolution < 5 || resolution > 2000) {
                    throw new Error('Width value should be a number between 5 and 2000');
                }

                result.push({ resolution });
            }
        }
    }

    return result;
};

export default processInput;
