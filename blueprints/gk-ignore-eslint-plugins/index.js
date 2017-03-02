/* eslint-env node */

const path = require('path');
const fs = require('fs-extra');
const pify = require('pify');

const readJson = pify(fs.readJson);
const writeJson = pify(fs.writeJson);

module.exports = {
  name: 'gk-ignore-eslint-plugins',

  normalizeEntityName() {
    // this prevents an error when the entityName is not specified
    // (since that doesn't actually matter to us)
  },

  afterInstall() {
    let pkgPath = path.join(this.project.root, 'package.json');

    return readJson(pkgPath).then(pkg => {
      pkg.greenkeeper = pkg.greenkeeper || {};
      pkg.greenkeeper.ignore = pkg.greenkeeper.ignore || [];

      if (this._hasEmberPlugin() && pkg.greenkeeper.ignore.indexOf('eslint-plugin-ember') === -1) {
        pkg.greenkeeper.ignore.push('eslint-plugin-ember');
      }

      if (this._hasQUnitPlugin() && pkg.greenkeeper.ignore.indexOf('eslint-plugin-qunit') === -1) {
        pkg.greenkeeper.ignore.push('eslint-plugin-qunit');
      }

      if (this._hasMochaPlugin() && pkg.greenkeeper.ignore.indexOf('eslint-plugin-mocha') === -1) {
        pkg.greenkeeper.ignore.push('eslint-plugin-mocha');
      }

      return writeJson(pkgPath, pkg, { spaces: 2 });
    });
  },

  _hasEmberPlugin() {
    return 'eslint-plugin-ember' in this.project.dependencies();
  },

  _hasQUnitPlugin() {
    return 'eslint-plugin-qunit' in this.project.dependencies();
  },

  _hasMochaPlugin() {
    return 'eslint-plugin-mocha' in this.project.dependencies();
  },
};
