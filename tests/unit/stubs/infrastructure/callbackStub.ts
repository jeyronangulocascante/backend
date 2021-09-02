export function callbackStub(err: string | Error, result: any) {
  if (err) {
    err;
  }
  if (result) {
    result;
  }
}

export const callbackStubFunction = () => callbackStub;
