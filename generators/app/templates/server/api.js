import {Restivus} from 'meteor/ajkwak:restivus';

const Api = new Restivus({
  apiPath: 'api',
  version: 'v1',
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  useDefaultAuth: true,
  prettyJson: true,
  enableCors: true
});

// Add Restivus Swagger configuration
// - meta, tags, params, definitions
Api.swagger = {
  meta: {
    swagger: '2.0',
    info: {
      version: '<%= version %>',
      title: '<%= title %>'
    }
  }
};

// Generate Swagger to route /api/v1/swagger.json
Api.addSwagger('swagger.json');

export default Api;
