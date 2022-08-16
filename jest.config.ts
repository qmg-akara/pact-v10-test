module.exports = {
  reporters: ['default'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.spec.ts$',
  testEnvironment: 'node',
  resetMocks: true,
  roots: ['<rootDir>'],
};
