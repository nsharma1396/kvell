module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  // extends: "kvell-scripts",
  extends: ["eslint:recommended", "plugin:node/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "node/no-unpublished-require": "off",
    "no-process-exit": "off"
  }
};
