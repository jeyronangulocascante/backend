import { logServiceStubFunction } from '@tests/unit/stubs/logServiceStub';
import { awsEventStub } from '@tests/unit/stubs/infrastructure/awsEventStub';
import { middyfyStubFunction } from '@tests/unit/stubs/infrastructure/middyfyStub';
import { contextRequestStub } from '@tests/unit/stubs/infrastructure/contextRequestStub';
import { callbackStub } from '@tests/unit/stubs/infrastructure/callbackStub';

let getFnMocked;
let moduleControllerStub;

describe('Hello', () => {
  beforeEach(() => {
    jest.mock('@logger/index', logServiceStubFunction);
    jest.mock('@module/infrastructure/libs/middyfy', middyfyStubFunction);
  });
  afterEach(() => {
    getFnMocked.mockReset();
  });

  it('should send the event body as a parameter to the controller', async () => {
    getFnMocked = jest.fn();
    moduleControllerStub = {
      ModuleController: jest.fn().mockImplementation(() => {
        return {
          getHello: getFnMocked,
        };
      }),
    };
    jest.mock('@module/module.controller', () => moduleControllerStub);
    const main = (
      await import('@module/infrastructure/functions/hello/handler')
    ).main;
    await main(awsEventStub, contextRequestStub, callbackStub);

    expect(getFnMocked).toHaveBeenCalledTimes(1);
    expect(getFnMocked).toHaveBeenCalledWith(awsEventStub.body);
  });

  it('should call the main function successfully.', async () => {
    const helloWorld = 'Hello World!';
    getFnMocked = jest.fn().mockImplementation(() => {
      return helloWorld;
    });
    moduleControllerStub = {
      ModuleController: jest.fn().mockImplementation(() => {
        return {
          getHello: getFnMocked,
        };
      }),
    };
    jest.mock('@module/module.controller', () => moduleControllerStub);
    const main = (
      await import('@module/infrastructure/functions/hello/handler')
    ).main;
    const result = await main(awsEventStub, contextRequestStub, callbackStub);

    expect(getFnMocked).toHaveBeenCalledTimes(1);
    expect(getFnMocked).toHaveBeenCalledWith(awsEventStub.body);
    expect(result).toBeDefined();
  });

  it('should call the main function and fail.', async () => {
    expect.assertions(1);
    getFnMocked = jest.fn().mockImplementation(() => {
      throw new Error('test');
    });
    moduleControllerStub = {
      ModuleController: jest.fn().mockImplementation(() => {
        return {
          getHello: getFnMocked,
        };
      }),
    };
    try {
      const main = (
        await import('@module/infrastructure/functions/hello/handler')
      ).main;
      await main(awsEventStub, contextRequestStub, callbackStub);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
