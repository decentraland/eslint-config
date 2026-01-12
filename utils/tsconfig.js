const fs = require('fs')
const path = require('path')

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch {
    return false
  }
}

/**
 * Returns TypeScript parserOptions for type-aware rules, based on common tsconfig
 * conventions in Decentraland repos.
 *
 * Priority:
 *  - tsconfig.eslint.json
 *  - tsconfig.json
 *  - tsconfig.app.json / tsconfig.node.json (Vite)
 */
function getTypeScriptProjectParserOptions(cwd = process.cwd()) {
  const eslintTsconfig = 'tsconfig.eslint.json'
  if (fileExists(path.join(cwd, eslintTsconfig))) {
    return { tsconfigRootDir: cwd, project: [eslintTsconfig] }
  }

  const tsconfig = 'tsconfig.json'
  if (fileExists(path.join(cwd, tsconfig))) {
    return { tsconfigRootDir: cwd, project: [tsconfig] }
  }

  const viteProjects = ['tsconfig.app.json', 'tsconfig.node.json']
  const found = viteProjects.filter(p => fileExists(path.join(cwd, p)))
  if (found.length > 0) {
    return { tsconfigRootDir: cwd, project: found }
  }

  return null
}

function hasTypeScriptProject(cwd = process.cwd()) {
  return Boolean(getTypeScriptProjectParserOptions(cwd))
}

module.exports = {
  getTypeScriptProjectParserOptions,
  hasTypeScriptProject
}


