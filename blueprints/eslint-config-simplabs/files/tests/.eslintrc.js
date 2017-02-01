module.exports = {<% if (hasEmberCLIMocha) { %>
  extends: 'simplabs/configs/ember-mocha',
<% } else { %>
  extends: 'simplabs/configs/ember-qunit',
<% } %>};
