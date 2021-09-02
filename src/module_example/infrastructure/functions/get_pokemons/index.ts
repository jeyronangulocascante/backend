// istanbul ignore file
// WHY?: This call has to match the type definition. Automatically Typesafe.

import { AWS } from '@serverless/typescript';

import { handlerPath } from '@module/utils/request';

import { handlerName } from './handler';

const awsHandlers: AWS['functions'] = {
  [handlerName]: {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: 'get',
          path: handlerName,
          request: {
            schemas: {},
          },
        },
      },
    ],
  },
};

export default awsHandlers[handlerName];
