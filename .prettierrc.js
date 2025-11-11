module.exports = {
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    arrowParens: "avoid",
    tabWidth: 4,
    printWidth: 100,
    endOfLine: "lf",
    bracketSpacing: true,
    useTabs: false,

    plugins: ["@trivago/prettier-plugin-sort-imports"],

    importOrder: ["^react", "<THIRD_PARTY_MODULES>", "^shared$", "^@/", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
