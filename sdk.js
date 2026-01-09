const { hasTypeScriptProject } = require("./utils/tsconfig")

const hasTypeScriptConfig = hasTypeScriptProject()

module.exports = {
  extends: [
    './.eslintrc.js'
  ],
  rules: {
    "eqeqeq": ["error", "always"],
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": hasTypeScriptConfig ? 2 : "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ]
  }
}