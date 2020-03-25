module.exports = {
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    node: true,
    es6: true,
  },
  extends: [
    './rules/possible-errors',
    './rules/best-practices',
    './rules/variables',
    './rules/style',
    './rules/node.js',
    './rules/es6.js'
  ]
};
