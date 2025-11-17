module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/android/",
        "/ios/",
        "/server/",
        "../server/",
        "../../server/",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    },
    rootDir: ".",
    testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
};
