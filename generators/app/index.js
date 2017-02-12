'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var fs = require('fs');
var http = require('http');
var https = require('https');
var URL = require('url-parse');
var SwaggerParser = require('swagger-parser');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to use the official ' + chalk.yellow('Restivus API') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'swaggerURL',
      message: 'Please type URL to Swagger spec:'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  parsing: function () {
    // Init variables
    var generator = this;
    var done = this.async();
    var log = this.log;
    var swaggerURL = this.props.swaggerURL;
    SwaggerParser.validate(swaggerURL, function (err, swaggerApi) {
      if (err) {
        log(err);
        done(err);
      } else {
        // Bind parsed swaggerApi to Generator instance
        var api = generator.api = swaggerApi;
        log('API name: %s, Version: %s', api.info.title, api.info.version);
        done();
      }
    });
  },
  writing: function () {
    // Init variables
    var done = this.async();
    var log = this.log;
    var swaggerURL = this.props.swaggerURL;
    var swaggerFilePath = this.destinationPath('spec/swagger.json');
    var swaggerFileStream;

    // Make missing folders
    fs.mkdir('spec', function (err) {
      if (err) {
        log('Unable to create folder');
        done(err);
      } else {
        swaggerFileStream = fs.createWriteStream(swaggerFilePath);
        // Parse URL
        var url = new URL(swaggerURL);
        // Copy original spec from URL
        if (url.protocol === 'https:') {
          https.get(swaggerURL, function (response) {
            response.pipe(swaggerFileStream);
          });
        } else if (url.protocol === 'http:') {
          http.get(swaggerURL, function (response) {
            response.pipe(swaggerFileStream);
          });
        } else {
          log('Please provide proper URL (http/https).');
        }
        done();
      }
    });
  },
  end: function () {
    this.log(yosay(
      chalk.yellow('Did all the hard work, phew!\nGoodbye.')
    ));
  }
});
