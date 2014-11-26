
module.exports = function (config, environment) {
  if (!config[environment]) {
    // no special config for this environment
    // move along, nothing to see here.
    return config;
  }

  var envConfig = config[environment];

  // hosts on an env config always override global hosts
  if (envConfig.hosts && envConfig.hosts.length) {
    config.hosts = envConfig.hosts;
  }

  // tags on an env config are added to/write over global tags
  if (envConfig.tags && Object.keys(envConfig.tags).length) {
    Object.keys(envConfig.tags).forEach(function (key) {
      config.tags[key] = envConfig.tags[key];
    });
  }

  return config;
};
