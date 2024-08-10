/**
 * Prompt class providing input functionality using the Inquirer library.
 */
import inquirer from 'inquirer';

import { IInquirerQuestions, InquirerQuestion } from './prompt.interface.js';

/**
 * Class representing a prompt for user input.
 */
class Prompt {
    /**
     * Asynchronously prompts the user for input using a single question.
     * @param questions - An array of InquirerQuestion objects representing the questions to prompt.
     * @returns A Promise resolving to the user's input for the specified question.
     * @throws {Error} If the input type is not supported.
     */
    public async input<T>(questions: InquirerQuestion<T>[]): Promise<T> {
        try {
            const answers = await inquirer.prompt(questions);
            return answers[questions[0].name];
        } catch (error) {
            throw new Error('Unsupported type of input.');
        }
    }

    /**
     * Asynchronously prompts the user for input using multiple questions.
     * @param questions - An array of IInquirerQuestions objects representing the questions to prompt.
     * @returns A Promise resolving to an object containing the user's input for each question.
     * @throws {Error} If the input type is not supported.
     */
    public async inputAll<T>(questions: IInquirerQuestions[]): Promise<T> {
        try {
            const answers = await inquirer.prompt(questions);
            return answers as T;
        } catch (error) {
            throw new Error('Unsupported type of input.');
        }
    }
}

export default Prompt;
