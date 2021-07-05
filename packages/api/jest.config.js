module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  collectCoverageFrom: ['src/**/*.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/tests/server/',
    '<rootDir>/src/dataSource/catalogService/cs-graphql.ts',
    '<rootDir>/src/dataSource/catalogService/query.ts',
    '.*__mocks__.*',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  setupFiles: ['core-js'],
};
