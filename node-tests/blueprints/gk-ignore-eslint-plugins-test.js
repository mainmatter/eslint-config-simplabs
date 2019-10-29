'use strict';

const fs = require('fs');

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;
var modifyPackages = blueprintHelpers.modifyPackages;

let { expect } = require('ember-cli-blueprint-test-helpers/chai');

describe('gk-ignore-eslint-plugins blueprint', function() {
  setupTestHooks(this);

  it('adds ember and qunit plugins to the ignore list', function() {
    return emberNew()
      .then(() => modifyPackages([
        { name: 'eslint-plugin-ember', dev: true },
        { name: 'eslint-plugin-qunit', dev: true },
      ]))
      .then(() => emberGenerate(['gk-ignore-eslint-plugins']))
      .then(() => {
        let pkg = JSON.parse(fs.readFileSync('package.json'));
        expect(pkg.greenkeeper).to.be.an('object');
        expect(pkg.greenkeeper.ignore).to.be.an('array');
        expect(pkg.greenkeeper.ignore).to.deep.equal(['eslint-plugin-ember', 'eslint-plugin-qunit']);
      });
  });

  it('adds mocha plugin to the ignore list', function() {
    return emberNew()
      .then(() => modifyPackages([
        { name: 'eslint-plugin-ember', dev: true },
        { name: 'eslint-plugin-mocha', dev: true },
      ]))
      .then(() => emberGenerate(['gk-ignore-eslint-plugins']))
      .then(() => {
        let pkg = JSON.parse(fs.readFileSync('package.json'));
        expect(pkg.greenkeeper).to.be.an('object');
        expect(pkg.greenkeeper.ignore).to.be.an('array');
        expect(pkg.greenkeeper.ignore).to.deep.equal(['eslint-plugin-ember', 'eslint-plugin-mocha']);
      });
  });
});
