export default {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js"
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ]
};
