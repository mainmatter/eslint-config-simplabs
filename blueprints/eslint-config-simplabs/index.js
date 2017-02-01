/* eslint-env node */

const path = require('path');
const fs = require('fs-extra');
const pify = require('pify');

const readJson = pify(fs.readJson);
const writeJson = pify(fs.writeJson);

module.exports = {
  name: 'eslint-config-simplabs',

  normalizeEntityName() {
    // this prevents an error when the entityName is not specified
    // (since that doesn't actually matter to us)
  },

  afterInstall() {
    let pkgPath = path.join(this.project.root, 'package.json');

    return readJson(pkgPath).then(pkg => {
      if (!('scripts' in pkg)) {
        pkg.scripts = {};
      }

      pkg.scripts.lint = 'eslint app addon blueprints config server test-support tests *.js';

      return writeJson(pkgPath, pkg, { spaces: 2 });
    });
  },
};
