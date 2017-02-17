import Api from './api'; <% if(api.definitions) { %>
Api.swagger.definitions = <%-JSON.stringify(api.definitions, null, 2)%>
<% } %>
