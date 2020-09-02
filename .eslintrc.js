module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier', 'import'],
  rules: {
    'no-console': 'off',
    'prettier/prettier': ['error'],
  },
};
