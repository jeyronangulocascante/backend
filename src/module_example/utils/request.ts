// istanbul ignore file
// WHY?: This is for utility purposes only.

import safeStringify from 'fast-safe-stringify';

export const handlerPath = (context: string) => {
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: safeStringify(response),
  };
};
