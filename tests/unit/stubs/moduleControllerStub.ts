export const moduleControllerStub = {
  ModuleController: jest.fn().mockImplementation(() => {
    return {
      getHello: jest.fn(),
    };
  }),
};

export const moduleControllerStubFunction = () => moduleControllerStub;
