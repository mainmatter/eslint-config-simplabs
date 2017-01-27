/* eslint-env node */

module.exports = {
  name: 'eslint-config-simplabs',

  normalizeEntityName() {
    // this prevents an error when the entityName is not specified
    // (since that doesn't actually matter to us)
  },
};
