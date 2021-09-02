import { Handler } from 'aws-lambda/handler';

export const middyfyStub = {
  middyfy: jest.fn().mockImplementation((handler: Handler) => {
    return handler as never;
  }),
};

export const middyfyStubFunction = () => middyfyStub;
