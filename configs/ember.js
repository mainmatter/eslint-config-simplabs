module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  plugins: ['ember'],
  extends: [
    'simplabs/configs/es6',
    'plugin:ember/recommended',
  ],
};
