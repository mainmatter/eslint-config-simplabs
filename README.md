eslint-config-simplabs
==============================================================================

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]

[npm-badge]: https://img.shields.io/npm/v/eslint-config-simplabs.svg
[npm-badge-url]: https://www.npmjs.com/package/eslint-config-simplabs
[travis-badge]: https://img.shields.io/travis/simplabs/eslint-config-simplabs/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/simplabs/eslint-config-simplabs

Shareable ESLint config for all [simplabs](https://simplabs.com/) projects


Installation
------------------------------------------------------------------------------

```
ember install eslint-config-simplabs
```

or if you don't use [Ember.js](http://emberjs.com/) in your project:

```
npm install --save-dev eslint-config-simplabs
```


Usage
------------------------------------------------------------------------------

Use the following snippet in your `.eslintrc.js` file to enable some of the
rulesets in this project:

```js
extends: [
  'simplabs',
  'simplabs/plugins/ember',
],
```

Please note that if you used `ember install` above this will be done
automatically for you.

There are three different kinds of things in this project:

- `rules` – Default settings for all builtin categories of ESLint rules
- `plugins` – Default settings for rules from other ESLint plugins
- `configs` – Combination of `rules` and `env` and parser settings

### Configs

- `ember` – Default settings for Ember apps (available as `simplabs` too)
- `ember-mocha` – Default settings for Mocha tests in Ember apps
- `ember-qunit` – Default settings for QUnit tests Ember apps
- `es6` – Default settings for ES6 code
- `node` – Default settings for Node.js code
- `node-0.x` – Default settings for code supporting Node 0.10 and 0.12 

These configs can be used by extending `simplabs/configs/<config-name>`. 

### Plugins

- `ember` – Default settings for [eslint-plugin-ember](https://github.com/netguru/eslint-plugin-ember)
- `mocha` – Default settings for [eslint-plugin-mocha](https://github.com/lo1tuma/eslint-plugin-mocha)
- `qunit` – Default settings for [eslint-plugin-qunit](https://github.com/platinumazure/eslint-plugin-qunit)

These plugin settings can be used by extending `simplabs/plugins/<plugin-name>`. 


License
------------------------------------------------------------------------------

eslint-config-simplabs is developed by and &copy;
[simplabs GmbH](http://simplabs.com) and contributors. It is released under the
[MIT License](LICENSE.md).
