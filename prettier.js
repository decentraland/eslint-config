const eslintrc = require("./.eslintrc")

module.exports = {
  parserOptions: eslintrc.parserOptions,
  rules: {
    "@typescript-eslint/no-floating-promises":
      eslintrc.rules["@typescript-eslint/no-floating-promises"] === "off" ? "off" : 2,
    "prettier/prettier": eslintrc.rules["prettier/prettier"],
  },
}
