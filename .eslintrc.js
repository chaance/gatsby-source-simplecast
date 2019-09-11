module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier', 'node'],
  extends: ['eslint:recommended', 'prettier', 'plugin:node/recommended-script'],
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
    'arrow-body-style': 0,
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
