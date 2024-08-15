![Converty Banner](./info/converty-banner.png)

# Converty: Image Optimization Magic ✨

Welcome to Converty – the wizardry of image optimization brought to your fingertips! 🌈

## Overview

Converty is a Node.js application that empowers you to perform image optimization with the flexibility of converting images to web-friendly formats like webp and avif. Additionally, you can optimize images by converting them to the classic JPG format, with the option to adjust quality. The magic doesn't stop there – during conversion, you can specify the width or height of the optimized images.

## Features

- Optimize images by converting to webp, avif, or JPG.
- Fine-tune JPG quality on a scale.
- Specify dimensions for the optimized images during conversion.
- Batch conversion of entire folders with nested files and directories.
- Choose to save optimized images in the original folder or create a separate copy.
- Configure settings interactively via CLI or provide them directly from the command line.
- Customize settings according to your needs through a configuration file for convenient command line usage.
- Choose between logging to a file or the console for enhanced flexibility.

## Technological Description

The Converty CLI project is developed following a modular architecture, where functionality is organized into classes and modules, each residing in dedicated folders with corresponding files. This architectural approach enhances code maintainability and scalability.

The application is meticulously documented, allowing you to effortlessly understand the code structure and facilitating the addition of new features or customization to suit your specific requirements. This thoughtful organization and documentation ensure a smooth development experience, whether you are extending the functionality or adapting the application to meet your unique needs.

The Converty CLI project is built with modern technologies to ensure efficient image optimization. Below is a technological overview:

- **Node.js:** The application is built on the Node.js runtime, leveraging its asynchronous and event-driven architecture.
- **TypeScript:** The project is written in TypeScript, providing static typing for enhanced code quality and maintainability.
- **Sharp:** Utilizes the Sharp image processing library for efficient image conversion and manipulation.
- **Imagemin:** Integrates the Imagemin library for minimalistic image optimization.
- **Inquirer:** Employs the Inquirer library for interactive command-line prompts, enhancing user experience.
- **Yargs:** Uses Yargs for parsing command-line arguments with ease.
- **Chalk:** Enhances the CLI with colorful and stylized output.
- **Chalk Animation:** Adds animated effects to CLI messages for a visually appealing experience.
- **ESLint and TypeScript ESLint:** Implements linting to ensure code quality and adherence to coding standards.
- **Git:** Version control is managed using Git for collaborative development and source code management.

## Installation

Get started with Converty in no time! Simply run the following commands:

```bash
git clone https://github.com/codedevbox/converty.git
```

```bash
cd converty
```

```bash
npm install
```

```bash
npm run build
```

## Usage

### Basic Conversion with CLI

To perform basic conversion using the CLI, execute the following command and respond to the prompted questions:

```bash
npm run start
```

### Command line mode

List of commands in full and abbreviated forms for use in the command line.

```bash
npm run start -- -h
```

### Options:

-t, --type Type of conversion (images) [string] [choices: "images"] [default: "images"]

-s, --source Specify the source folder [string] [default: "images"]

-r, --recursive Specify if you want to process the folder and all its contents. [boolean] [default: false]

-c, --copy Specify if you want to put the result in a new folder. [boolean] [default: false]

-d, --destination Specify the output folder (Only English letters, numbers, hyphens, and underscores are allowed.). [string] [default: "result"]

-o, --overwrite Overwrite the original file [boolean] [default: false]

-f, --from Specify which images to process (.jpg, .jpeg, .png) [string] [choices: "all", ".jpg", ".jpeg", ".png"] [default: "all"]

-i, --in Specify the formats to convert to (.webp, .avif, .jpg) [string] [choices: "all", ".webp", ".avif", ".jpg"] [default: "all"]

-w, --width Specify the width of the new image (e.g., 800). If preparing images with different widths, separate them by commas (e.g., 1200, 800, 400). Use a colon to indicate the suffix to be added at the end of the new file name (e.g., 1200:-b, 800:-m, 400:-s) [string] [default: "no"]

--height, --he If necessary, specify the height of the new image (e.g., 800). If preparing images with different heights, separate them by commas (e.g., 1200, 800, 400). Use a colon to indicate the suffix to be added at the end of the new file name (e.g., 1200:-b, 800:-m, 400:-s). [string] [default: "no"]

--version Show version number [boolean]

-h, --help Show help [boolean]

The default source folder is 'images,' but you can specify another one using the 'source' parameter. The folder to which the copy will be made is determined by the 'destination' parameter.

This command is used to convert all images in the "images" folder, including all nested subfolders and images, into the "result" folder overwrite the original file with quality for jpg 30 and png 35 :

```bash
npm run start -- -r -c -o -qjpg 30 -qpng 35
```

"If you don't set the --copy (-c) parameter, the converted files will be placed in the original folder. If you don't set the --recursive (-r) parameter, the conversion will only process the content of the original folder without handling images in nested folders."

The following example converts images in the default 'images' folder into all available conversion formats and saves them in the same folder with a width of 1200 pixels, appending '-1200' to the end of the original file names.

```bash
npm run start -- -w 1200
```

The following example converts all PNG images from the 'data' folder, including nested subfolders, to the 'img' folder in the webp format. The images will be converted in two sizes, 1200 and 800 pixels wide, with '-b' and '-s' appended to the end of the file name, respectively.

```bash
npm run start -- -s data -r -c -d img -f .png -i .webp -w 1200:-b,800:-s
```

The following example converts all PNG images from the folder, including nested subfolders, to the 'result' folder in JPG format. The images will be resized to a width of 1000 pixels.

```bash
npm run start -- -r -f .png -i .jpg -w 1000
```

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, feel free to contact us at codedevbox@gmail.com.
