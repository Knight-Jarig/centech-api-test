module.exports.readVersion = function(contents) {
  return JSON.parse(contents).version;
};

module.exports.writeVersion = function(contents, version) {
  let json = JSON.parse(contents);
  json.version = version;

  if (json.dependencies && json.dependencies['@central-tech/operation']) {
    json.dependencies['@central-tech/operation'] = version;
  }
  if (!json.name.includes('/api') && json.peerDependencies && json.peerDependencies['@central-tech/operation']) {
    json.peerDependencies['@central-tech/operation'] = version;
  }
  return JSON.stringify(json, null, 2);
};
