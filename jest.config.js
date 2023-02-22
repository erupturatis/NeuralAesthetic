module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  testPathIgnorePatterns: ["./__tests__/index.js", "./__tests__/react_app"],
  moduleNameMapper: {
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
};
