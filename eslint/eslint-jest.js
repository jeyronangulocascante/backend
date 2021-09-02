module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'node/no-extraneous-import': [0],
    'no-useless-catch': [0],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0],
    'no-unused-vars': [0],
    'no-unused-expressions': [0],
  },
  env: {
    'jest/globals': true,
  },
};
