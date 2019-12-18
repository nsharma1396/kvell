module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["plugin:node/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  rules: {
    "node/no-unpublished-require": "off",
    "node/no-unsupported-features/es-syntax": "off"
  }
};
