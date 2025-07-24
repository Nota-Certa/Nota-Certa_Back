// apps/<APP_NAME>/jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../../tsconfig.json'); // Adjust path if tsconfig.json is not at root

module.exports = {
  // The root directory for the tests. This is crucial for monorepos.
  // It should point to the root of the specific microservice.
  rootDir: '.', // This means the current directory (apps/<APP_NAME>) is the root for Jest

  // Paths to look for test files.
  // Jest will look for files matching these patterns relative to `rootDir`.
  testRegex: '.*\\.spec\\.ts$', // Matches files ending with .spec.ts

  // Transform files with ts-jest for TypeScript support
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // Module file extensions to consider
  moduleFileExtensions: ['js', 'json', 'ts'],

  // Collect code coverage from these files
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  coverageDirectory: './coverage', // Output directory for coverage reports

  // Test environment. NestJS often uses 'node'.
  testEnvironment: 'node',

  // Setup files to run before tests in the environment
  setupFilesAfterEnv: [], // Add any global setup files here if needed

  // Module name mapping for TypeScript paths (from tsconfig.json)
  // This helps Jest resolve paths like @app/common if you're using them.
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/../../' }), // Adjust prefix based on your monorepo structure
  // The prefix should be the path from your Jest rootDir (apps/<APP_NAME>)
  // to the directory containing your tsconfig.json (which defines the paths).
  // In your case, if tsconfig.json is at the repo root, and jest.config.js is in apps/<APP_NAME>,
  // then '../../' will correctly point to the root.
};
