module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["*.js", "!node_modules/**", "!test/**"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  preset: "ts-jest",
  testMatch: ["**/test/**/*.test.(ts|js)"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "test/tsconfig.json",
      },
    ],
  },
};
