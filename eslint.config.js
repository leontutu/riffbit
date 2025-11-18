const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
    {
        ignores: ["**/templates/**", "node_modules/**"],
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 2021,
            sourceType: "module",
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
    {
        files: ["**/eslint.config.js"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        files: ["app/**/*.{js,jsx,ts,tsx}"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        files: ["**/*.test.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
];
