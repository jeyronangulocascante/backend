/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import { ILogRepository } from '@logger/interfaces';

export class ModuleController {
  constructor(private readonly logger: ILogRepository) {}

  async getHello(body: { name: string }) {
    this.logger.debug({ method: 'ModuleController.getHello', data: body });
    return `Hello ${body.name}, welcome to the exciting Serverless world!`;
  }
}
