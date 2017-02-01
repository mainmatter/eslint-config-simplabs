module.exports = {<% if (hasEmberCLIMocha) { %>
  extends: [
    'simplabs/configs/ember-mocha',
    'simplabs/rules/mocha',
  ],
<% } else { %>
  extends: 'simplabs/configs/ember-qunit',
<% } %>};
