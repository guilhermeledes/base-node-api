export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testMatch: ['**/?(*.)+(spec|test).[t]s'],
  testPathIgnorePatterns: ['/node_modules/', 'build'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }
}