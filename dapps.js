const { getTypeScriptProjectParserOptions } = require("./utils/tsconfig")

const tsProject = getTypeScriptProjectParserOptions()
const hasTypeScriptProject = Boolean(tsProject)

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ...(tsProject ?? {}),
  },
  plugins: ["@typescript-eslint", "import", "autofix"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react/display-name": "off",
    "import/no-named-as-default-member": "off",
    "import/no-default-export": "error",
    "import/group-exports": "error",
    "import/exports-last": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/ban-tslint-comment": "error",
    "quotes": ["error", "single", { avoidEscape: true }],
    "@typescript-eslint/no-misused-promises": [
      ...(hasTypeScriptProject ? ["error", { checksVoidReturn: false }] : ["off"]),
    ],
    "@typescript-eslint/no-unnecessary-type-assertion": hasTypeScriptProject ? "error" : "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", ignoreRestSiblings: true },
    ],
    "@typescript-eslint/unbound-method": hasTypeScriptProject ? "error" : "off",
    "@typescript-eslint/naming-convention": hasTypeScriptProject
      ? [
          "error",
          { selector: "default", format: ["camelCase"] },
          { selector: "variableLike", format: ["camelCase"] },
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
          },
          {
            selector: "variable",
            types: ["function"],
            format: ["PascalCase", "camelCase"],
          },
          {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "allow",
          },
          { selector: "memberLike", format: ["camelCase"] },
          {
            selector: "memberLike",
            modifiers: ["private"],
            format: ["camelCase"],
            leadingUnderscore: "allow",
          },
          { selector: "typeLike", format: ["PascalCase"] },
          { selector: "typeParameter", format: ["PascalCase"], prefix: ["T"] },
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: { regex: "^I[A-Z]", match: false },
          },
          {
            selector: [
              "variable",
              "function",
              "objectLiteralProperty",
              "objectLiteralMethod",
            ],
            types: ["function"],
            format: ["StrictPascalCase", "strictCamelCase"],
          },
          {
            selector: ["enum"],
            format: ["UPPER_CASE", "PascalCase"],
            leadingUnderscore: "allow",
          },
          {
            selector: ["enumMember"],
            format: ["UPPER_CASE"],
            leadingUnderscore: "allow",
          },
        ]
      : "off",
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
          "parent",
          "sibling",
          "index",
          "object",
        ],
        pathGroupsExcludedImportTypes: [
          "react",
          "react-*/**",
          "react-*",
          "@dcl/**",
          "decentraland-*/**",
          "decentraland-*",
          "@mui/*",
          "@dcl/schemas/*",
          "@emotion/*",
        ],
        pathGroups: [
          { pattern: "react", group: "builtin", position: "before" },
          { pattern: "react-*/**", group: "builtin" },
          { pattern: "react-*", group: "builtin" },
          { pattern: "@dcl/**", group: "external", position: "after" },
          {
            pattern: "decentraland-*/**",
            group: "external",
            position: "after",
          },
          { pattern: "decentraland-*", group: "external", position: "after" },
          { pattern: "@mui/*", group: "internal" },
          { pattern: "@emotion/*", group: "internal" },
          { pattern: "@dcl/schemas/*", group: "internal" },
          { pattern: "lib/**", group: "internal", position: "before" },
          { pattern: "modules/**", group: "internal", position: "before" },
          { pattern: "components/**", group: "internal", position: "after" },
          { pattern: "./*.types", group: "sibling", position: "after" },
          { pattern: "./*.styled", group: "sibling", position: "after" },
          { pattern: "./*.css", group: "sibling", position: "after" },
        ],
        distinctGroup: false,
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
          orderImportKind: "desc",
        },
        warnOnUnassignedImports: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        semi: false,
        singleQuote: true,
        printWidth: 140,
        tabWidth: 2,
        trailingComma: "none",
        arrowParens: "avoid",
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: {
        paths: ["./src"],
      },
    },
  },
};
