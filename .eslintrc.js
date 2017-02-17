module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "document": true,
        "$": true,
        "localStorage": true,
        "Handlebars": true,
        "console": true,
        "model": true,
        "view": true,
        "controller": true,
        "utils": true
    },
    "rules": {
        // Possible Errors

        "no-extra-parens": [1, "functions"],

        // Best Practices

        "curly": 1,
        "dot-notation": [1, {
            "allowKeywords": false
        }],
        "no-div-regex": 1,
        "no-else-return": 1,
        "no-eq-null": 1,
        "no-floating-decimal": 1,
        "no-lone-blocks": 1,
        "no-self-compare": 1,
        "no-throw-literal": 1,
        "no-unused-expressions": 1,
        "no-unused-vars": 1,
        "no-useless-call": 1,
        "no-void": 1,
        "no-with": 1,
        "radix": 1,
        "wrap-iife": [1, "outside"],
        "no-extra-bind": 1,

        // Variables

        "no-unused-vars": [1, {
            "vars": "all",
            "args": "after-used"
        }],
        "no-label-var": 1,

        // Node.js and CommonJS

        "no-process-env": 1,

        // Stylistic Issues

        "brace-style": [1, "1tbs", {
            "allowSingleLine": false
        }],
        "comma-dangle": 2,
        "semi": [2, "always"],
        "comma-style": [1, "last"],
        "no-lonely-if": 1,
        "no-unneeded-ternary": 1,
        "one-var": [1, "always"],
        "operator-linebreak": [1, "after"],
        "keyword-spacing": 1,
        "space-before-blocks": 1,
        "no-bitwise": 1,
        "no-plusplus": 1
    }
};
