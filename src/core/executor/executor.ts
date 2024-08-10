/**
 * Executor class responsible for executing the main functionality of the application.
 */
import HandlerFactory from '../handlers/handler-factory.js';
import ConvertTypeHandler from '../input/hendlers/convert-type.handler.js';
import delay from '../../utils/delay.js';

import { ILogger } from '../../output/logger.interface.js';

/**
 * Class representing the executor of the application.
 */
class Executor {
    private convertTypeHandler: ConvertTypeHandler = new ConvertTypeHandler();

    /**
     * Constructs an Executor instance with the provided logger.
     * @param logger - The logger used to log messages during execution.
     */
    constructor(private logger: ILogger) { }

    /**
     * Executes the main functionality of the application.
     */
    async execute() {
        const inputType = process.argv.length > 2 ? 'commandline' : 'inquiry';
        const convertType = await this.convertTypeHandler.getConvertType(inputType);
        const handler = HandlerFactory.createHandler(inputType, convertType, this.logger);
        await handler.process();
        await this.logger.animate(`FINISH!`);
        await delay(1000);
    }
}

export default Executor;
