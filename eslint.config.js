const js = require("@eslint/js");
const config_prettier = require("eslint-config-prettier");
const globals = require("globals");
const babel_parser = require("@babel/eslint-parser");

module.exports = [
    js.configs.recommended,
    config_prettier,
    {
        languageOptions: {
            ecmaVersion: 2022,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
            parser: babel_parser,
        },
        ignores: [
            "cache/",
            "coverage/",
            "dist/",
            "node_modules/",
            "stats.json",
            "style/",
        ],
        rules: {
            "no-debugger": 1,
            "no-duplicate-imports": 1,
            // Do keep due avoid unintendet consequences.
            "no-alert": 0,
            "no-control-regex": 0,
            "no-self-assign": 0,
            "no-useless-escape": 0,
        },
    }
];
