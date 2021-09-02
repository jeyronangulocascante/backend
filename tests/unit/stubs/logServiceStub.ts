export const logServiceStub = {
  LogService: jest.fn().mockImplementation(() => {
    return {
      info: jest.fn(),
      debug: jest.fn(),
    };
  }),
};

export const logServiceStubFunction = () => logServiceStub;
