module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        args: 'none'
      }
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': ['error', 'never'],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'error',
    'react/require-default-props': 'off',
    'react/jsx-uses-vars': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'no-promise-executor-return': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration'
      }
    ],
    semi: ['error', 'never']
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        project: './'
      }
    }
  }
}
