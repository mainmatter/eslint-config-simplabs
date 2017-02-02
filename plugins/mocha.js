module.exports = {
  plugins: [
    'mocha',
  ],
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-skipped-tests': 'off',
    'mocha/no-pending-tests': 'off',
    'mocha/handle-done-callback': 'error',
    'mocha/no-synchronous-tests': 'off',
    'mocha/no-global-tests': 'error',
    'mocha/no-return-and-callback': 'error',
    'mocha/valid-test-description': 'off',
    'mocha/valid-suite-description': 'off',
    'mocha/no-sibling-hooks': 'error',
    'mocha/no-mocha-arrows': 'error',
    'mocha/no-hooks': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'mocha/no-top-level-hooks': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/max-top-level-suites': 'off',
    'mocha/no-nested-tests': 'error',
  },
};
