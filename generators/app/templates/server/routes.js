import Api from './api';
<% for (var p in api.paths) { %>
Api.addRoute('<%= p %>', {}, {<% for (var e in api.paths[p]) { %>
<%= e %>: {
    swagger: {
      tags: ['<%= api.paths[p][e].tags %>'],
      description: '<%= api.paths[p][e].description %>',
      responses: {<% for (var r in api.paths[p][e].responses) { %>
        <%= r %>: {
          description: '<%= api.paths[p][e].responses[r].description %>',
        },<% } %>
      },
    },
    action: function () {
      // Write controller action here
    }
  },<% } %>
});
<% } %>
