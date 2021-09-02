process.env = {};

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: './tests/*/.*.test.ts$',
  testPathIgnorePatterns: ['src/logger'],
  moduleNameMapper: {
    '^@logger(.*)$': '<rootDir>/src/logger/$1',
    '^@services(.*)$': '<rootDir>/src/services/$1',
    '^@module(.*)$': '<rootDir>/src/module_example/$1',
    '^@tests(.*)$': '<rootDir>/tests/$1',
  },
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  restoreMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coveragePathIgnorePatterns: ['src/logger'],
  moduleDirectories: ['node_modules', 'src'],
};
