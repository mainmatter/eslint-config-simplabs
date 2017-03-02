/* eslint-env node */

const path = require('path');
const fs = require('fs-extra');
const pify = require('pify');
const execa = require('execa');
const supportsColor = require('supports-color');
const VersionChecker = require('ember-cli-version-checker');

const readJson = pify(fs.readJson);
const writeJson = pify(fs.writeJson);

let emberPluginVersion = '^3.0.1';
let qunitPluginVersion = '^2.3.0';
let mochaPluginVersion = '^4.8.0';

module.exports = {
  name: 'eslint-config-simplabs',

  init() {
    this._super && this._super.init.apply(this, arguments);

    this._checker = new VersionChecker(this);
  },

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
      let packages = [];

      if (!this._hasEmberPlugin()) {
        packages.push({ name: 'eslint-plugin-ember', target: emberPluginVersion });
      }

      if (this._hasEmberCLIQUnit() && !this._hasQUnitPlugin()) {
        packages.push({ name: 'eslint-plugin-qunit', target: qunitPluginVersion });
      } else if (this._hasEmberCLIMocha() && !this._hasMochaPlugin()) {
        packages.push({ name: 'eslint-plugin-mocha', target: mochaPluginVersion });
      }

      if (packages.length !== 0) {
        return this.addPackagesToProject(packages);
      }
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

  _hasEmberPlugin() {
    return 'eslint-plugin-ember' in this.project.dependencies() &&
      this._checker.for('eslint-plugin-ember', 'npm').satisfies(emberPluginVersion);
  },

  _hasEmberCLIQUnit() {
    return 'ember-cli-qunit' in this.project.dependencies();
  },

  _hasQUnitPlugin() {
    return 'eslint-plugin-qunit' in this.project.dependencies() &&
      this._checker.for('eslint-plugin-qunit', 'npm').satisfies(qunitPluginVersion);
  },

  _hasEmberCLIMocha() {
    return 'ember-cli-mocha' in this.project.dependencies();
  },

  _hasMochaPlugin() {
    return 'eslint-plugin-mocha' in this.project.dependencies() &&
      this._checker.for('eslint-plugin-mocha', 'npm').satisfies(mochaPluginVersion);
  },
};
