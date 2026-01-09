# DCL ESLint & Prettier Config

## Installation

```sh
yarn add -D @dcl/eslint-config
```

## Usage (ESLint 9, `eslint.config.js`)

In your `eslint.config.js`:

```js
const coreDapps = require("@dcl/eslint-config/core-dapps.config");

module.exports = [...coreDapps];
```

Other presets available:

- `@dcl/eslint-config/core-services.config`
- `@dcl/eslint-config/dapps.config`
- `@dcl/eslint-config/ui.config`
- `@dcl/eslint-config/sdk.config`

## Legacy usage with `.eslintrc` (ESLint 8 / transition)

In your `.eslintrc.cjs`:

```js
module.exports = {
  extends: ["@dcl/eslint-config/core-dapps"],
};
```

## Type-aware rules without manual `parserOptions.project`

TypeScript presets (for example `core-dapps`) **auto-detect** a tsconfig in the consumer repo:

- `tsconfig.eslint.json` (preferred)
- `tsconfig.json`
- `tsconfig.app.json` / `tsconfig.node.json` (Vite)

If no tsconfig is found, rules that require type information are disabled to avoid crashes.

## npm-package-json-lint (shareable config)

In your `.npmpackagejsonlintrc.json`:

```json
{
  "extends": "@dcl/eslint-config/npm-package-json-lint"
}
```

Key rules:

- `dependencies` and `devDependencies` must use **exact versions**
- automatic exception (computed from your `package.json`): internal packages (`@dcl/*`, `decentraland-*`) may use version ranges (`^`)

How the exception works:

- `@dcl/eslint-config/npm-package-json-lint` is a **JavaScript config module**.
- When `npmPkgJsonLint` loads it, it reads the consumer repo `package.json` from `process.cwd()` and builds the exception list from the package names found in `dependencies`/`devDependencies` that match `@dcl/*` or `decentraland-*`.
- That means you don't need to list exceptions manually: if you add `@dcl/schemas` with `^` it will be allowed; if you add `react` with `^` it will be reported.

Monorepos: run `npmPkgJsonLint` from the package folder you want to lint (so `process.cwd()` points to the right `package.json`), or override rules locally.

## Peer dependencies

This package publishes most tooling as **peerDependencies**. In the consumer repo you'll need (depending on the preset):

- `eslint`
- `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`
- `prettier`, `eslint-plugin-prettier`, `eslint-config-prettier`
- `eslint-plugin-import`, `eslint-import-resolver-typescript`
- `eslint-plugin-react` (if you use React presets)
- `eslint-plugin-autofix`

> Note: some presets configure the `babel-module` resolver; if you use it, install `eslint-import-resolver-babel-module` and its peers (`@babel/core`, `babel-plugin-module-resolver`).

## License

Apache 2.0
