/* eslint-env node */

const path = require('path');
const fs = require('fs-extra');
const pify = require('pify');
const execa = require('execa');
const supportsColor = require('supports-color');

const readJson = pify(fs.readJson);
const writeJson = pify(fs.writeJson);

module.exports = {
  name: 'eslint-config-simplabs',

  normalizeEntityName() {
    // this prevents an error when the entityName is not specified
    // (since that doesn't actually matter to us)
  },

  beforeInstall() {
    let pkgPath = path.join(this.project.root, 'package.json');

    return readJson(pkgPath).then(pkg => {
      let eslintExists = (pkg.dependencies && pkg.dependencies['ember-cli-eslint']) ||
        (pkg.devDependencies && pkg.devDependencies['ember-cli-eslint']);

      if (!eslintExists) {
        return this.addAddonToProject('ember-cli-eslint')
      }
    });
  },

  locals: function() {
    return {
      hasEmberCLIQUnit: this._hasEmberCLIQUnit(),
      hasEmberCLIMocha: this._hasEmberCLIMocha(),
    };
  },

  afterInstall() {
    let pkgPath = path.join(this.project.root, 'package.json');

    return readJson(pkgPath).then(pkg => {
      if (!('scripts' in pkg)) {
        pkg.scripts = {};
      }

      pkg.scripts.lint = 'eslint app addon blueprints config server test-support tests *.js';

      return writeJson(pkgPath, pkg, { spaces: 2 });
    }).then(() => {
      let packages = [{ name: 'eslint-plugin-ember' }];

      if (this._hasEmberCLIQUnit()) {
        packages.push({ name: 'eslint-plugin-qunit' });
      } else if (this._hasEmberCLIMocha()) {
        packages.push({ name: 'eslint-plugin-mocha' });
      }

      return this.addPackagesToProject(packages);
    }).then(() => {
      return this.ui.prompt({
        type: 'confirm',
        name: 'fix',
        message: 'Do you want to run `eslint --fix` now?',
      });
    }).then(answer => {
      if (answer.fix) {
        let args = ['run', 'lint', '--', '--fix'];
        if (supportsColor) {
          args.push('--color')
        }

        let child = execa('npm', args, { cwd: this.project.root });

        child.stdout.pipe(process.stdout);

        return child.catch(() => { /* ¯\_(ツ)_/¯ */ });
      }
    });
  },

  _hasEmberCLIQUnit() {
    return 'ember-cli-qunit' in this.project.dependencies();
  },

  _hasEmberCLIMocha() {
    return 'ember-cli-mocha' in this.project.dependencies();
  },
};
