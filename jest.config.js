module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "./__tests__/index.js",
    "./__tests__/react_integration",
  ],
};
