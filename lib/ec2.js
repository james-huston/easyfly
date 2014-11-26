
var aws = require('aws-sdk');
var debug = require('debug')('easyfly:ec2');

module.exports = function (config, filterObj, callback) {
  var instances = [];

  aws.config.update(config);

  var ec2 = new aws.EC2({
    region: config.region,
    maxRetries: 2
  });

  var params = uglyFilter(filterObj);

  debug('ec2 params', params);

  // all intances are 'reservations'
  ec2.describeInstances(params, function (err, data) {
    if (err) {
      debug(err, err.stack);
      return callback(err, []);
    }

    // go through each instance returned
    data.Reservations.forEach(function (r) {
      r.Instances.forEach(function (i) {
        // skip instances that are not running
        if (i.State.Name !== 'running') return;

        i.Tags = tagsToObject(i.Tags);
        instances.push(i);
      });

    });

    debug('instances found', instances);

    return callback(undefined, instances);
  });
};

// convert an array of key/val to an obj
function tagsToObject(tags) {
  var obj = {};
  tags.forEach(function (t) {
    obj[t.Key] = t.Value;
  });
  return obj;
}

function uglyFilter(obj) {
  var filters = [];
  for (var p in obj) {
    filters.push({
      Name: 'tag:' + p,
      Values: [obj[p]]
    });
  }
  return {
    Filters: filters
  };
}