module.exports = {
  root: true,
  extends: ["eslint:recommended"],
  plugins: ["node"],
  env: {
    node: true,
    mongo: true,
    mocha: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2020
    // ecmaFeatures: {}
  },
  rules: {
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_|^req|^res|^next|^err|^app$", ignoreRestSiblings: true }
    ]
  }
};
