import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist'],
    languageOptions: {
      // other options...
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import": importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "sort-imports": [
        "error",
        {
          "ignoreCase": true,
          "ignoreDeclarationSort": true
        }
      ],
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal"],
          "pathGroups": [
            {
              "pattern": "react**",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "@**",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "icons",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "constants/**",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "entities",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "helpers/**",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "hooks/**",
              "group": "internal",
              "position": "after"
            },

            {
              "pattern": "components/**",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "styles/**",
              "group": "internal",
              "position": "after"
            },
            {
              "pattern": "theme/**",
              "group": "internal",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react"],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          },
        },
      ]
    },
  },
)
