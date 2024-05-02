module.exports = {
  preset: 'jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testMatch: ['**/_test_/**/*.test.[jt]s?(x)', '*/?(-)+(.spec|test).[tj]s?(x)'],
};
