const rootConfig = require("../../eslint.config.js");

module.exports = [
    ...rootConfig,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                ...require("globals").node,
            },
        },
    },
];
