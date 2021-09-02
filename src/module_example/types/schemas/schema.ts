// istanbul ignore file
// WHY?: Variables and Types don't need to be tested.

import type { FromSchema } from 'json-schema-to-ts';

const name = {
  description: 'Codename of our games, usually 3 letters',
  type: 'string',
  minLength: 5,
  maxLength: 10,
} as const;

export const schema = {
  type: 'object',
  properties: {
    name: name,
  },
  required: ['name'],
} as const;

export type SchemaRequest = FromSchema<typeof schema>;
