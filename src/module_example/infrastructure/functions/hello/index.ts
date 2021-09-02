// istanbul ignore file
// WHY?: This call has to match the type definition. Automatically Typesafe.

import { schema } from '@module/types/schemas/schema';
import { AWS } from '@serverless/typescript';

import { handlerPath } from '@module/utils/request';

import { handlerName } from './handler';

const awsHandlers: AWS['functions'] = {
  [handlerName]: {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: 'post',
          path: handlerName,
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
    ],
  },
};

export default awsHandlers[handlerName];
