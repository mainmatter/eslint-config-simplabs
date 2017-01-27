module.exports = {
  env: {
    embertest: true,
    mocha: true,
  },
  extends: [
    'simplabs/configs/ember',
  ],
  rules: {
    // disabled to allow e.g. `expect(foo).to.be.true;`
    'no-unused-expressions': 'off',

    // disabled to allow `function() {...}` in `it()` blocks
    'prefer-arrow-callback': 'off',
  },
};
