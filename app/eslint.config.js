const rootConfig = require("../../eslint.config.js");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactNative = require("eslint-plugin-react-native");

module.exports = [
    ...rootConfig,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...require("globals").jest,
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-native": reactNative,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react-native/no-inline-styles": "off",
            "@typescript-eslint/no-require-imports": "off",
        },
    },
];
