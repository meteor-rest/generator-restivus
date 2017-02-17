import Api from './api';
// Add swagger definitions
Api.swagger.definitions = <%-JSON.stringify(api.definitions, null, 2)%>
