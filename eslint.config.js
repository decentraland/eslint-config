const path = require('path')

const js = require('@eslint/js')
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  // `test/.eslintrc.js` has relative `extends: ['../.eslintrc.js']`
  baseDirectory: path.join(__dirname, 'test'),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

module.exports = [
  // TS project config doesn't include JS config files like `test/.eslintrc.js`
  { ignores: ['test/.eslintrc.js', 'test/fixtures/**'] },
  ...compat.config(require('./test/.eslintrc.js'))
]


