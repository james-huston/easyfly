
var Flightplan = require('flightplan');
var deployments = require('deployments');
var debug = require('debug')('easyfly:deploy');

module.exports = function (appName, version, instances) {
  debug('deploy to hosts', instances);

  var myDeploy = deployments[appName] || {};
};
