module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
