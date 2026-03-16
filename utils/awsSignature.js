const aws4 = require("aws4");
const config = require("../config/env");

function signRequest(options) {

  aws4.sign(options, {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey
  });

  return options;
}

module.exports = { signRequest };