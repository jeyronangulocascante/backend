import { ModuleController } from '@module/module.controller';
import { awsEventStub } from '../stubs/infrastructure/awsEventStub';
import { loggerRepositoryStub } from '../stubs/infrastructure/loggerRepositoryStub';

describe('Hello', () => {
  it('should return a Hello World that includes the body.name', async () => {
    const moduleController = new ModuleController(loggerRepositoryStub);
    const response = await moduleController.getHello(awsEventStub.body);

    expect(response).toEqual(
      `Hello ${awsEventStub.body.name}, welcome to the exciting Serverless world!`,
    );
  });
});
