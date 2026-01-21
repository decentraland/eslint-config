const fs = require('fs')
const path = require('path')

function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    return null
  }
}

function getInternalPackageExceptions(pkgJsonSection) {
  if (!pkgJsonSection || typeof pkgJsonSection !== 'object') return []

  return Object.keys(pkgJsonSection).filter(
    name => name.startsWith('@dcl/') || name.startsWith('decentraland-') || name.startsWith('dcl-')
  )
}

function getPreferAbsoluteRule(severity, exceptions) {
  return exceptions.length > 0 ? [severity, { exceptions }] : severity
}

const pkgJson = safeReadJson(path.join(process.cwd(), 'package.json'))

module.exports = {
  rules: {
    // Dependency Management Standard:
    // - deps/devDeps must be exact
    // - exception: internal Decentraland packages may use ranges (^)
    'prefer-absolute-version-dependencies': getPreferAbsoluteRule(
      'warning',
      getInternalPackageExceptions(pkgJson?.dependencies)
    ),
    'prefer-absolute-version-devDependencies': getPreferAbsoluteRule(
      'warning',
      getInternalPackageExceptions(pkgJson?.devDependencies)
    ),
    'no-file-dependencies': 'error',
    'no-git-dependencies': 'error',
    'no-duplicate-properties': 'error',
    'prefer-property-order': [
      'error',
      [
        'name',
        'version',
        'description',
        'main',
        'module',
        'types',
        'type',
        'exports',
        'files',
        'scripts',
        'dependencies',
        'peerDependencies',
        'peerDependenciesMeta',
        'devDependencies',
        'repository',
        'keywords',
        'author',
        'license',
        'bugs',
        'homepage',
        'engines',
        'overrides',
        'publishConfig'
      ]
    ]
  }
}


