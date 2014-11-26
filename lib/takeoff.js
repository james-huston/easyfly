
var awsconfig = require('aws');
var ec2 = require('./ec2');
var debug = require('debug')('easyfly:takeoff');
var deploy = require('./deploy');
var deployments = require('deployments');
var configCleaner = require('./configcleaner');

module.exports = function (environment, appName, version) {
  debug('app to deploy', appName, version);

  var appConfig = deployments[appName] || {};

  if (!appConfig) {
    debug('no config found for app', appName);
    return;
  }

  appConfig = configCleaner(appConfig, environment);
  debug(appConfig);

  if (appConfig.hosts && appConfig.hosts.length) {
    deploy(appName, version, appConfig.hosts);
  } else {
    ec2(awsconfig, appConfig.tags, function (err, instances) {
      if (err) {
        debug('ec2 error', err);
        return;
      }

      var hosts = [];
      instances.forEach(function (instance) {
        hosts.push({
          host: instance.PublicIpAddress,
          name: instance.Tags.Name
        });
      });

      deploy(appName, version, hosts);
    });
  }
};
