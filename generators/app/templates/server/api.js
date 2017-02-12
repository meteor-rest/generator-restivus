import {Restivus} from 'meteor/ajkwak:restivus';

const Api = new Restivus({
  apiPath: 'api',
  version: 'v1',
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  useDefaultAuth: false,
  prettyJson: true,
  enableCors: true
});

// Add Restivus Swagger configuration
// - meta, tags, params, definitions
Api.swagger = {
  meta: {
    swagger: '2.0',
    info: {
      version: '<%= api.info.version %>',
      title: '<%= api.info.title %>'
    }
  }
};

// Generate Swagger to route /api/v1/swagger.json
Api.addSwagger('swagger.json');

export default Api;
