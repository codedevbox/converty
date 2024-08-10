/**
 * Interface representing an Inquirer question.
 * @typeparam T - The type of the question (e.g., 'input', 'confirm', 'list').
 */
import { Answers } from 'inquirer';

export interface InquirerQuestion<T> {
    type: T;
    name: string;
    message: string;
    choices?: string[] | undefined;
}

/**
 * Interface representing a set of Inquirer questions.
 */
export interface IInquirerQuestions {
    type: 'input' | 'confirm' | 'list';
    name: string;
    message: string;
    default?: string | boolean | string[];
    when?: (answers: Answers) => boolean;
    choices?: string[];
    validate?: (input: string) => string | boolean;
}
