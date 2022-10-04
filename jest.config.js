/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./scripts/jest-setup.js'],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
    "^.+\\.css$": "./scripts/jest-transform-css.js",
  },
};