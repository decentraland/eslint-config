module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports,
    project: 'test/tsconfig.json'
  },
  extends: ['../.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off'
  }
}
