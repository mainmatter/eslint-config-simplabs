# Changelog

## 0.4.0 (2017-03-02)

#### :rocket: Enhancements

- Update "eslint-plugin-ember" to v3.0.1

#### :bug: Bug Fixes

- blueprint: Install ESLint plugins if versions are incompatible


## 0.3.1 (2017-03-02)

#### :rocket: Enhancements

- [#16](https://github.com/simplabs/eslint-config-simplabs/pull/16) Update dependencies ([@greenkeeper](https://github.com/integration/greenkeeper))
- Add "gk-ignore-eslint-plugins" blueprint

#### :bug: Bug Fixes

- blueprints: Install plugins with explicit version constraints


## 0.3.0 (2017-02-02)

#### :rocket: Enhancements

- [#7](https://github.com/simplabs/eslint-config-simplabs/pull/7) blueprints: Detect "ember-cli-mocha" automatically ([@Turbo87](https://github.com/Turbo87))
- [#8](https://github.com/simplabs/eslint-config-simplabs/pull/8) Add support for "eslint-plugin-mocha" ([@Turbo87](https://github.com/Turbo87))
- [#9](https://github.com/simplabs/eslint-config-simplabs/pull/9) Add support for "eslint-plugin-qunit" ([@Turbo87](https://github.com/Turbo87))
- [#10](https://github.com/simplabs/eslint-config-simplabs/pull/10) Add support for "eslint-plugin-ember" ([@Turbo87](https://github.com/Turbo87))
- [#11](https://github.com/simplabs/eslint-config-simplabs/pull/11) blueprints: Ask user to confirm "eslint --fix" execution ([@Turbo87](https://github.com/Turbo87))
- [#13](https://github.com/simplabs/eslint-config-simplabs/pull/13) blueprints: Use "--color" for ESLint output if the environment supports it ([@Turbo87](https://github.com/Turbo87))
- [#14](https://github.com/simplabs/eslint-config-simplabs/pull/14) blueprints: Invoke "npm install" only when needed ([@Turbo87](https://github.com/Turbo87))
- [#15](https://github.com/simplabs/eslint-config-simplabs/pull/15) Update README ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fixes

- rules/ember: Fix typo

#### :house: Internal Changes

- [#12](https://github.com/simplabs/eslint-config-simplabs/pull/12) rules: Move plugin rulesets into "plugins" folder ([@Turbo87](https://github.com/Turbo87))


## 0.2.2 (2017-02-01)

#### :rocket: Enhancements

- [#4](https://github.com/simplabs/eslint-config-simplabs/pull/4) Improved `eslint-config-simplabs` blueprint ([@Turbo87](https://github.com/Turbo87))


## 0.2.1 (2017-02-01)

#### :bug: Bug Fixes

- configs/es6: Add missing "es6" globals


## 0.2.0 (2017-01-31)

#### :rocket: Enhancements

- Explicitly set all options
- Add "eslint-config-simplabs" blueprint
- Add "ember-qunit" and "ember-mocha" configs
- configs/ember: Set parser options
- configs: Extract "base" and "node-0.x" config
- config/ember-mocha: Disable "prefer-arrow-callback" rule
- rules: Enable more "best-practices" rules
- rules: Enable more "variables" rules
- rules: Enable more "node" rules
- rules: Enable more "style" rules
- rules: Enable more "es6" rules
- configs: Set "ecmaVersion" parser option in "es6" config
- rules/style: Adjust "key-spacing" options
- blueprints: Add "tests" config

#### :house: Internal Changes

- Extract rule categories into separate files
- Move configuration file into new "configs" subfolder
- Extract "es6" and "node" configs


## 0.1.0 (2017-01-27)

- Initial release
