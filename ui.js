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
  plugins: ["@typescript-eslint", "react", "prettier", "import", "autofix"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
  ],
  rules: {
    "react/display-name": "off",
    "import/no-named-as-default-member": "off",
    "import/no-default-export": "error",
    "import/group-exports": "error",
    "import/exports-last": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-object-type": [
      "error",
      { allowObjectTypes: "always" },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: ["lodash", "decentraland-connect"],
        patterns: ["lodash.*"],
      },
    ],
    "autofix/no-debugger": "error",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true, // don't want to sort import lines, use eslint-plugin-import instead
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
          ["sibling", "parent"], // <- Relative imports, the sibling and parent types they can be mingled together
          "index",
          "object",
          "type",
          "unknown",
        ],
        pathGroupsExcludedImportTypes: [
          "react",
          "react-*",
          "@mui/*",
          "@dcl/schemas/*",
          "@emotion/*",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "react-*",
            group: "builtin",
          },
          {
            pattern: "decentraland-*",
            group: "internal",
          },
          {
            pattern: "@mui/*",
            group: "internal",
          },
          {
            pattern: "@emotion/*",
            group: "internal",
          },
          {
            pattern: "@dcl/schemas/*",
            group: "internal",
          },
          { pattern: "./*.types", group: "sibling", position: "after" },
          { pattern: "./*.styled", group: "sibling", position: "after" },
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
      "babel-module": {},
    },
    react: {
      version: "detect",
    },
  },
};
