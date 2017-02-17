import Api from './api';
<% for (var p in api.paths) { %>
Api.addRoute('<%= p %>', {}, {<% for (var e in api.paths[p]) { %>
<%= e %>: {
    swagger: {
      tags: ['<%= api.paths[p][e].tags %>'],
      description: '<%= api.paths[p][e].description %>',<% if(api.paths[p][e].parameters) { %>
      parameters: [<% for (var param in api.paths[p][e].parameters) { %>
        {
          name: '<%= api.paths[p][e].parameters[param].name %>',
          in: '<%= api.paths[p][e].parameters[param].in %>',
          description: '<%= api.paths[p][e].parameters[param].description %>',
          required: <%= api.paths[p][e].parameters[param].required %>,
          type: '<%= api.paths[p][e].parameters[param].type %>',
        },<% } %>
      ],<% } %>
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
