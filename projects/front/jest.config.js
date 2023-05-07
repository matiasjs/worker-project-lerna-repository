const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./src/",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/redux/(.*)$": "<rootDir>/src/redux/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
