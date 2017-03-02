module.exports = {
  plugins: [
    'ember',
  ],
  rules: {
    // General
    'ember/local-modules': 'error',
    'ember/no-observers': 'off',
    'ember/no-side-effects': 'error',
    'ember/jquery-ember-run': 'off',
    'ember/named-functions-in-promises': 'off',
    'ember/no-function-prototype-extensions': 'error',
    'ember/use-ember-get-and-set': 'off',
    'ember/use-brace-expansion': 'error',

    // Organizing
    'ember/order-in-components': 'error',
    'ember/order-in-controllers': 'error',
    'ember/order-in-models': 'error',
    'ember/order-in-routes': 'error',

    // Controllers
    'ember/alias-model-in-controller': 'off',

    // Components
    'ember/avoid-leaking-state-in-components': 'error',
    'ember/closure-actions': 'error',
    'ember/no-on-calls-in-components': 'error',

    // Ember Data
    'ember/no-empty-attrs': 'error',

    // Routing
    'ember/routes-segments-snake-case': 'error',
  },
};
