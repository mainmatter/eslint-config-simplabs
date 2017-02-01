'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;

let { expect, file } = require('ember-cli-blueprint-test-helpers/chai');

describe('eslint-config-simplabs blueprint', function() {
  setupTestHooks(this);

  it('generates .eslintrc.js files', function() {
    return emberNew()
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => {
        expect(file('.eslintrc.js')).to.contain('extends: \'simplabs\'');
        expect(file('tests/.eslintrc.js')).to.contain('extends: \'simplabs/configs/ember-qunit\'');
      });
  });

  it('creates a "lint" script in package.json', function() {
    return emberNew()
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => {
        let pkg = JSON.parse(file('package.json').content);
        expect(pkg)
          .to.have.property('scripts')
          .to.have.property('lint', 'eslint app addon blueprints config server test-support tests *.js');
      });
  });
});
