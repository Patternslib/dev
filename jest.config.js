const path = require("path");

// Set the default roots to "./src", which would work in most projects following
// Patternslib conventions which extend this jest.config.js.
const roots = ["./src"];

module.exports = {
    roots: roots,
    setupFilesAfterEnv: [path.resolve(__dirname, "./jest/setup-tests.js")],
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "\\.(html|xml|svg)$": path.resolve(__dirname, "./jest/raw-loader.js"),
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        "/node_modules/(?!@patternslib/)(?!preact/)(?!screenfull/).+\\.[t|j]sx?$",
    ],
};
