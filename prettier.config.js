module.exports = {
    tabWidth: 4,
    quoteProps: "consistent",
    printWidth: 89,
    // @trivago/prettier-plugin-sort-imports
    importOrder: ["^[./]"],
    importOrderCaseInsensitive: false,
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,
    plugins: ["@trivago/prettier-plugin-sort-imports"]
};
