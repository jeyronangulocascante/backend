export const awsEventStub = {
  resource: '/documents',
  path: '/documents',
  httpMethod: 'POST',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'US',
    Host: 'se75cwwcfj.execute-api.us-east-1.amazonaws.com',
    'Postman-Token': '45ecfe4f-cdec-4bb7-8cca-c774b439345f',
    'User-Agent': 'PostmanRuntime/7.28.0',
    Via: '1.1 4f9e9e3e8a2a5cea2848aac8473267f2.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'B53qnH1ZHGSosDFxi1Ub5OE4GA1HarLD-dPBXbUgfowIBwSgYQT6qg==',
    'X-Amzn-Trace-Id': 'Root=1-60e47768-5a2a1f201d166a29031e9211',
    'X-Forwarded-For': '18.235.145.3, 70.132.60.131',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
  },
  multiValueHeaders: {
    Accept: ['*/*'],
    'Accept-Encoding': ['gzip, deflate, br'],
    'CloudFront-Forwarded-Proto': ['https'],
    'CloudFront-Is-Desktop-Viewer': ['true'],
    'CloudFront-Is-Mobile-Viewer': ['false'],
    'CloudFront-Is-SmartTV-Viewer': ['false'],
    'CloudFront-Is-Tablet-Viewer': ['false'],
    'CloudFront-Viewer-Country': ['US'],
    Host: ['se75cwwcfj.execute-api.us-east-1.amazonaws.com'],
    'Postman-Token': ['45ecfe4f-cdec-4bb7-8cca-c774b439345f'],
    'User-Agent': ['PostmanRuntime/7.28.0'],
    Via: ['1.1 4f9e9e3e8a2a5cea2848aac8473267f2.cloudfront.net (CloudFront)'],
    'X-Amz-Cf-Id': ['B53qnH1ZHGSosDFxi1Ub5OE4GA1HarLD-dPBXbUgfowIBwSgYQT6qg=='],
    'X-Amzn-Trace-Id': ['Root=1-60e47768-5a2a1f201d166a29031e9211'],
    'X-Forwarded-For': ['18.235.145.3, 70.132.60.131'],
    'X-Forwarded-Port': ['443'],
    'X-Forwarded-Proto': ['https'],
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: '1bnaue',
    resourcePath: '/documents',
    httpMethod: 'POST',
    extendedRequestId: 'CDeYYGfloAMFU3Q=',
    requestTime: '06/Jul/2021:15:31:52 +0000',
    path: '/dev/documents',
    accountId: '626912750860',
    protocol: 'HTTP/1.1',
    stage: 'dev',
    domainPrefix: 'se75cwwcfj',
    requestTimeEpoch: 1625585512600,
    requestId: 'f111f25b-caa1-47e0-aa54-287e437d3264',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '18.235.145.3',
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'PostmanRuntime/7.28.0',
      user: null,
    },
    domainName: 'se75cwwcfj.execute-api.us-east-1.amazonaws.com',
    apiId: 'se75cwwcfj',
  },
  body: {
    name: 'Testing',
  },
  isBase64Encoded: false,
};

export const awsEventStubFunction = () => awsEventStub;