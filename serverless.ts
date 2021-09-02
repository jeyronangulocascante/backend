import type { AWS } from '@serverless/typescript';

import * as functions from '@module/infrastructure/functions';
console.log({ functions });

const serverlessConfiguration: AWS = {
  service: 'omni-backend-base',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-prune-plugin',
    'serverless-api-gateway-throttling',
    'serverless-domain-manager',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        managedPolicies: [
          'arn:aws:iam::aws:policy/AmazonCognitoPowerUser',
          'arn:aws:iam::aws:policy/AmazonSQSFullAccess',
          'arn:aws:iam::aws:policy/AmazonElastiCacheFullAccess',
          'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess',
          'arn:aws:iam::aws:policy/SecretsManagerReadWrite',
          'arn:aws:iam::aws:policy/AmazonS3FullAccess',
          'arn:aws:iam::aws:policy/CloudWatchFullAccess',
          'arn:aws:iam::aws:policy/IAMFullAccess',
          'arn:aws:iam::aws:policy/AWSLambda_FullAccess',
        ],
        statements: [
          {
            Effect: 'Allow',
            Action: ['lambda:InvokeFunction'],
            Resource: ['*'],
          },
          {
            Effect: 'Allow',
            Action: ['sqs:*'],
            Resource: [
              { 'Fn::GetAtt': ['CustomersQueue', 'Arn'] },
              { 'Fn::GetAtt': ['MerchantsQrGeneratorQueue', 'Arn'] },
              { 'Fn::GetAtt': ['MerchantsPointsOfSaleGeneratorQueue', 'Arn'] },
            ],
          },
        ],
      },
    },
    deploymentBucket: {
      name: 'omni-backend-base-deployment',
      maxPreviousDeploymentArtifacts: 5,
      blockPublicAccess: true,
      tags: {
        product: 'omni-payments',
      },
    },
  },
  functions,
};

module.exports = serverlessConfiguration;
