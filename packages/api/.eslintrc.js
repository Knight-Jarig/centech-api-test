module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    expect: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 'arrow-spacing': 'error',
    // 'block-spacing': 'error',
    // 'comma-dangle': 'off',
    // 'comma-spacing': 'error',
    // 'comma-style': 'error',
    // curly: [2, 'multi-line'],
    // 'dot-notation': 'error',
    // eqeqeq: ['error', 'smart'],
    // 'eol-last': 'error',
    // 'key-spacing': 'error',
    // 'keyword-spacing': 'error',
    // 'linebreak-style': ['error', 'unix'],
    // 'no-console': 'off',
    // 'no-param-reassign': 'error',
    // 'no-tabs': 'error',
    // 'no-trailing-spaces': 'error',
    // 'no-underscore-dangle': 'error',
    // 'no-var': 'error',
    // 'no-whitespace-before-property': 'error',
    // 'prefer-const': 'error',
    // semi: ['error', 'always'],
    // 'semi-spacing': 'error',
    // 'space-before-blocks': 'error',
    // 'space-in-parens': 'error',
    camelcase: 'off',
    '@typescript-eslint/camelcase': [
      'off',
      {
        properties: 'never',
        ignoreDestructuring: true,
      },
    ],
  },
};