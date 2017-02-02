'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;
var modifyPackages = blueprintHelpers.modifyPackages;

let { expect, file } = require('ember-cli-blueprint-test-helpers/chai');

const td = require('testdouble');

const Blueprint = require('ember-cli/lib/models/blueprint');

describe('eslint-config-simplabs blueprint', function() {
  setupTestHooks(this);

  let taskFor, addonTaskRun, npmTaskRun;

  beforeEach(function() {
    addonTaskRun = td.function();
    td.when(addonTaskRun(td.matchers.anything())).thenResolve();

    npmTaskRun = td.function();
    td.when(npmTaskRun(td.matchers.anything())).thenResolve();

    taskFor = td.replace(Blueprint.prototype, 'taskFor');
    td.when(taskFor('addon-install')).thenReturn({ run: addonTaskRun });
    td.when(taskFor('npm-install')).thenReturn({ run: npmTaskRun });
  });

  afterEach(function() {
    td.reset();
  });

  it('generates .eslintrc.js files', function() {
    return emberNew()
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => {
        expect(file('.eslintrc.js')).to.contain('extends: \'simplabs\'');
        expect(file('tests/.eslintrc.js')).to.equal(file(`${__dirname}/fixtures/.eslintrc.qunit.js`));
      });
  });

  it('generates .eslintrc.js files for ember-cli-mocha', function() {
    return emberNew()
      .then(() => modifyPackages([
        { name: 'ember-cli-mocha', dev: true },
        { name: 'ember-cli-qunit', delete: true },
      ]))
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => {
        expect(file('.eslintrc.js')).to.contain('extends: \'simplabs\'');
        expect(file('tests/.eslintrc.js')).to.equal(file(`${__dirname}/fixtures/.eslintrc.mocha.js`));
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

  it('installs `ember-cli-eslint` addon', function() {
    return emberNew()
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => {
        let captor = td.matchers.captor();
        td.verify(addonTaskRun(captor.capture()), { times: 1 });
        expect(captor.value).to.have.property('packages');
        expect(captor.value.packages).to.deep.equal(['ember-cli-eslint']);
      });
  });

  it('does not install `ember-cli-eslint` addon if it exists already', function() {
    return emberNew()
      .then(() => modifyPackages([{ name: 'ember-cli-eslint', dev: true }]))
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => {
        td.verify(addonTaskRun(td.matchers.anything()), { times: 0 });
      });
  });

  it('installs `eslint-plugin-qunit` addon', function() {
    return emberNew()
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => verifyNpmInstalls(['eslint-plugin-ember', 'eslint-plugin-qunit']));
  });

  it('does not install `eslint-plugin-qunit` if it is not needed', function() {
    return emberNew()
      .then(() => modifyPackages([{ name: 'ember-cli-qunit', delete: true },]))
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => verifyNpmInstalls(['eslint-plugin-ember']));
  });

  it('installs `eslint-plugin-mocha` addon', function() {
    return emberNew()
      .then(() => modifyPackages([
        { name: 'ember-cli-mocha', dev: true },
        { name: 'ember-cli-qunit', delete: true },
      ]))
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => verifyNpmInstalls(['eslint-plugin-ember', 'eslint-plugin-mocha']));
  });

  it('does not install `eslint-plugin-mocha` if it is not needed', function() {
    return emberNew()
      .then(() => modifyPackages([{ name: 'ember-cli-qunit', delete: true },]))
      .then(() => emberGenerate(['eslint-config-simplabs']))
      .then(() => verifyNpmInstalls(['eslint-plugin-ember']));
  });

  function verifyNpmInstalls(packages) {
    let captor = td.matchers.captor();
    td.verify(npmTaskRun(captor.capture()), { times: 1 });
    expect(captor.value).to.have.property('packages');
    expect(captor.value.packages).to.deep.equal(packages);
  }
});
