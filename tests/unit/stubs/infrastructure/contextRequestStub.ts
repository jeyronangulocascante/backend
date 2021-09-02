import { Context } from 'aws-lambda/handler';

export const contextRequestStub: Context = {
  awsRequestId: '123',
  succeed: (messageOrObject: any): void => {
    messageOrObject;
  },
  done: (error?: Error, result?: any): void => {
    if (error) {
      error;
    }
    if (result) {
      result;
    }
  },
  fail: (error: Error | string): void => {
    error;
  },
} as Context;

export const contextRequestStubFunction = () => contextRequestStub;
