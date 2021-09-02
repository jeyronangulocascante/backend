// istanbul ignore file
// WHY?: Testing this code would be testing the external middleware.

import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser());
};
