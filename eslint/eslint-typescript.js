module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  // camelcase, indent, no-array-constructor, and no-unused-vars are all
  // busted when using TypeScript at the moment. When you use this plugin, you're
  // forced to turn off the base rules from ESLint and turn on the TypeScript-friendly
  // variant that comes with @typescript-eslint/eslint-plugin.
  rules: {
    // camelcase interference fix.
    camelcase: 'off',
    '@typescript-eslint/camelcase': 'off',
    // indent interference fix.
    // '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    // no-array-constructor interference fix.
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',
    // no-unused-vars interference fix.
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0],
    '@typescript-eslint/no-empty-function': ['off'],
  },
};
