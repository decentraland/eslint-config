interface ESLintConfig {
  extends?: string[]
  rules?: Record<string, any>
  parserOptions?: Record<string, any>
}

describe('when loading ESLint configurations', () => {
  describe('and the main configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../index.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../index.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
      expect(Array.isArray(config.extends)).toBe(true)
      expect(typeof config.rules).toBe('object')
    })

    it('should include TypeScript ESLint recommended plugin', () => {
      expect(config.extends).toContain('plugin:@typescript-eslint/recommended')
    })

    it('should define multiple rules', () => {
      expect(Object.keys(config.rules).length).toBeGreaterThan(0)
    })
  })

  describe('and the SDK configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../sdk.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../sdk.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
    })
  })

  describe('and the UI configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../ui.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../ui.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
    })
  })

  describe('and the DApps configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../dapps.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../dapps.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
    })
  })

  describe('and the Gatsby configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../gatsby.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../gatsby.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
    })
  })

  describe('and the Core Services configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../core-services.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../core-services.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
    })
  })

  describe('and the Core UI configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../core-ui.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../core-ui.js')
      }).not.toThrow()
    })

    it('should have extends and rules properties', () => {
      expect(config).toHaveProperty('extends')
      expect(config).toHaveProperty('rules')
    })
  })

  describe('and the Prettier configuration is loaded', () => {
    let config: ESLintConfig

    beforeEach(() => {
      config = require('../prettier.js')
    })

    it('should load without throwing errors', () => {
      expect(() => {
        require('../prettier.js')
      }).not.toThrow()
    })

    it('should have parserOptions and rules properties', () => {
      expect(config).toHaveProperty('parserOptions')
      expect(config).toHaveProperty('rules')
    })
  })
})
