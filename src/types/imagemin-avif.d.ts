/**
 * Type declarations for the 'imagemin-avif' module.
 */
declare module 'imagemin-avif' {
    import { Buffer } from 'buffer';
    import { Sharp } from 'sharp';
    /**
    * Options for the imageminAvif function.
    */
    interface AvifOptions {
        quality?: number;
        lossless?: boolean;
        speed?: number;
        chromaSubsampling?: string;
    }

    function imageminAvif(options?: AvifOptions): (input: Buffer) => Promise<Sharp>;

    export = imageminAvif;
}
