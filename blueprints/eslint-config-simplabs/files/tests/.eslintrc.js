module.exports = {<% if (hasEmberCLIMocha) { %>
  extends: [
    'simplabs/configs/ember-mocha',
    'simplabs/plugins/mocha',
  ],
<% } else if (hasEmberCLIQUnit) { %>
  extends: [
    'simplabs/configs/ember-qunit',
    'simplabs/plugins/qunit',
  ],
<% } %>};
