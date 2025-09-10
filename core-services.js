module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
    "autofix",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "eqeqeq": ["error", "always"],
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/array-type": ["error", { "default": "array-simple" }],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "import/no-named-as-default-member": "off",
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          "{}": {
            message: "Use Record<string, unknown> instead of {}",
            fixWith: "Record<string, unknown>",
          },
        },
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": "off",
    "autofix/no-debugger": "error",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "object",
          "type",
          "unknown",
        ],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: "@well-known-components/*",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@dcl/*",
            group: "internal",
          },
          {
            pattern: "decentraland-*",
            group: "internal",
          },
        ],
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {},
    },
  },
};