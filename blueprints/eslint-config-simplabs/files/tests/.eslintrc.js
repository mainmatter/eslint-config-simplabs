module.exports = {<% if (hasEmberCLIMocha) { %>
  extends: [
    'simplabs/configs/ember-mocha',
    'simplabs/rules/mocha',
  ],
<% } else if (hasEmberCLIQUnit) { %>
  extends: [
    'simplabs/configs/ember-qunit',
    'simplabs/rules/qunit',
  ],
<% } %>};
