/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  clearMocks: true,
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  setupFiles: ['dotenv/config'],
};