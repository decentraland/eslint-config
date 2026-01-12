const path = require('path')
const { ESLint } = require('eslint')

interface ESLintConfig {
  extends?: string[]
  rules?: Record<string, unknown>
  parserOptions?: Record<string, unknown>
}

type LoadConfigFn<T> = () => T

function requireFresh<T>(modulePath: string): T {
  let loadedModule: T

  jest.isolateModules(() => {
    loadedModule = require(modulePath)
  })

  return loadedModule!
}

function withCwd<T>(cwd: string, fn: () => T): T {
  const previousCwd = process.cwd()
  process.chdir(cwd)
  try {
    return fn()
  } finally {
    process.chdir(previousCwd)
  }
}

function resetDclEslintConfigModuleCache() {
  const modules: string[] = [
    '../utils/tsconfig',
    '../.eslintrc.js',
    '../core-dapps.js',
    '../core-services.js',
    '../dapps.js',
    '../ui.js',
    '../sdk.js',
    '../prettier.js',
    '../core-dapps.config.js',
    '../core-services.config.js',
    '../dapps.config.js',
    '../ui.config.js',
    '../sdk.config.js'
  ]

  for (const modulePath of modules) {
    try {
      delete require.cache[require.resolve(modulePath)]
    } catch {
      // ignore
    }
  }
}

describe('when loading ESLint configurations', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('and the main configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../index.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose an extends array and rules object', () => {
      expect(config).toEqual(
        expect.objectContaining({
          extends: expect.any(Array),
          rules: expect.any(Object)
        })
      )
    })

    it('should include TypeScript ESLint recommended plugin in extends', () => {
      expect(config.extends).toContain('plugin:@typescript-eslint/recommended')
    })

    it('should define at least one rule', () => {
      expect(Object.keys(config.rules ?? {}).length).toBeGreaterThan(0)
    })
  })

  describe('and the SDK configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../sdk.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose an extends array', () => {
      expect(config.extends).toEqual(expect.any(Array))
    })
  })

  describe('and the UI configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../ui.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose a rules object', () => {
      expect(config.rules).toEqual(expect.any(Object))
    })
  })

  describe('and the DApps configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../dapps.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose a rules object', () => {
      expect(config.rules).toEqual(expect.any(Object))
    })
  })

  describe('and the Core Services configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../core-services.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose a rules object', () => {
      expect(config.rules).toEqual(expect.any(Object))
    })
  })

  describe('and the Core DApps configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../core-dapps.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose a rules object', () => {
      expect(config.rules).toEqual(expect.any(Object))
    })
  })

  describe('and the Prettier configuration is loaded', () => {
    let config: ESLintConfig
    let loadConfig: LoadConfigFn<ESLintConfig>

    beforeEach(() => {
      loadConfig = () => requireFresh<ESLintConfig>('../prettier.js')
      config = loadConfig()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should load without throwing errors', () => {
      expect(loadConfig).not.toThrow()
    })

    it('should expose parserOptions', () => {
      expect(config.parserOptions).toEqual(expect.any(Object))
    })
  })

  describe('and the Core DApps configuration is used', () => {
    let modulePath: string

    beforeEach(() => {
      modulePath = '../core-dapps.js'
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    describe('when a tsconfig is present', () => {
      let config: ESLintConfig
      let fixtureDir: string

      beforeEach(() => {
        fixtureDir = path.resolve(__dirname, 'fixtures/with-tsconfig')
        config = withCwd(fixtureDir, () => requireFresh<ESLintConfig>(modulePath))
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should set parserOptions.tsconfigRootDir', () => {
        expect(config.parserOptions?.tsconfigRootDir).toBe(fixtureDir)
      })

      it('should set parserOptions.project to tsconfig.json', () => {
        expect(config.parserOptions?.project).toEqual(['tsconfig.json'])
      })

      it('should enable @typescript-eslint/no-misused-promises', () => {
        expect((config.rules?.['@typescript-eslint/no-misused-promises'] as string[] | undefined)?.[0]).toBe('error')
      })
    })

    describe('when a tsconfig is missing', () => {
      let config: ESLintConfig
      let fixtureDir: string

      beforeEach(() => {
        fixtureDir = path.resolve(__dirname, 'fixtures/no-tsconfig')
        config = withCwd(fixtureDir, () => requireFresh<ESLintConfig>(modulePath))
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should omit parserOptions.project', () => {
        expect(config.parserOptions?.project).toBeUndefined()
      })

      it('should disable @typescript-eslint/no-misused-promises', () => {
        expect((config.rules?.['@typescript-eslint/no-misused-promises'] as string[] | undefined)?.[0]).toBe('off')
      })

      it('should disable @typescript-eslint/naming-convention', () => {
        expect(config.rules?.['@typescript-eslint/naming-convention']).toBe('off')
      })
    })
  })

  describe('and the ESLint 9 config-array entrypoints are loaded', () => {
    describe('and core-dapps.config is loaded', () => {
      let config: unknown[]

      beforeEach(() => {
        config = requireFresh<unknown[]>('../core-dapps.config.js')
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should export an array', () => {
        expect(Array.isArray(config)).toBe(true)
      })
    })

    describe('and core-services.config is loaded', () => {
      let config: unknown[]

      beforeEach(() => {
        config = requireFresh<unknown[]>('../core-services.config.js')
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should export an array', () => {
        expect(Array.isArray(config)).toBe(true)
      })
    })

    describe('and dapps.config is loaded', () => {
      let config: unknown[]

      beforeEach(() => {
        config = requireFresh<unknown[]>('../dapps.config.js')
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should export an array', () => {
        expect(Array.isArray(config)).toBe(true)
      })
    })

    describe('and ui.config is loaded', () => {
      let config: unknown[]

      beforeEach(() => {
        config = requireFresh<unknown[]>('../ui.config.js')
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should export an array', () => {
        expect(Array.isArray(config)).toBe(true)
      })
    })

    describe('and sdk.config is loaded', () => {
      let config: unknown[]

      beforeEach(() => {
        config = requireFresh<unknown[]>('../sdk.config.js')
      })

      afterEach(() => {
        jest.resetAllMocks()
      })

      it('should export an array', () => {
        expect(Array.isArray(config)).toBe(true)
      })
    })

    describe('and core-dapps.config is used to lint a repo', () => {
      let config: import('eslint').Linter.Config[]
      let lintResult: import('eslint').ESLint.LintResult
      let eslint: import('eslint').ESLint
      let code: string
      let filePath: string
      let fixtureDir: string

      describe('when a tsconfig is present', () => {
        beforeEach(async () => {
          fixtureDir = path.resolve(__dirname, 'fixtures/with-tsconfig')

          const loaded = withCwd(fixtureDir, () => {
            resetDclEslintConfigModuleCache()
            return requireFresh<import('eslint').Linter.Config[]>('../core-dapps.config')
          })

          config = loaded
          filePath = path.join(fixtureDir, 'src/index.ts')
          code = 'export const meaningOfLife: number = 42\n'

          eslint = new ESLint({
            overrideConfig: config,
            overrideConfigFile: true,
            ignore: false
          })
          ;[lintResult] = await eslint.lintText(code, { filePath })
        })

        afterEach(() => {
          jest.resetAllMocks()
        })

        it('should not produce fatal errors', () => {
          expect(lintResult.fatalErrorCount).toBe(0)
        })
      })

      describe('when a tsconfig is missing', () => {
        beforeEach(async () => {
          fixtureDir = path.resolve(__dirname, 'fixtures/no-tsconfig')

          const loaded = withCwd(fixtureDir, () => {
            resetDclEslintConfigModuleCache()
            return requireFresh<import('eslint').Linter.Config[]>('../core-dapps.config')
          })

          config = loaded
          filePath = path.join(fixtureDir, 'src/index.ts')
          code = 'export const meaningOfLife: number = 42\n'

          eslint = new ESLint({
            overrideConfig: config,
            overrideConfigFile: true,
            ignore: false
          })
          ;[lintResult] = await eslint.lintText(code, { filePath })
        })

        afterEach(() => {
          jest.resetAllMocks()
        })

        it('should not produce fatal errors', () => {
          expect(lintResult.fatalErrorCount).toBe(0)
        })
      })
    })
  })
})
