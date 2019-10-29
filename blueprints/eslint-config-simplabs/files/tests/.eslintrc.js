module.exports = {<% if (hasMocha) { %>
  extends: [
    'simplabs/configs/ember-mocha',
    'simplabs/plugins/mocha',
  ],
<% } else if (hasQUnit) { %>
  extends: [
    'simplabs/configs/ember-qunit',
    'simplabs/plugins/qunit',
  ],
<% } %>};
