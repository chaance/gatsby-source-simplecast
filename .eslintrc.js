module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier', 'jest', 'node'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended-script',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-unused-vars': [1, { ignoreRestSiblings: true, args: 'none' }],
    'no-unused-expressions': 1,
    'consistent-return': 0,
    'no-console': 0,
    'no-inner-declarations': 0,
    'prettier/prettier': 0,
    quotes: 0,
    'require-jsdoc': 0,
    'valid-jsdoc': 0,
  },
};
