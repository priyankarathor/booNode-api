const aws4 = require("aws4");
const config = require("../config/env");

function signRequest(path, method = "GET", body = "") {
  const opts = {
    host: config.spapi.host,
    path,
    method,
    service: "execute-api",
    region: config.spapi.region,
    body: body ? JSON.stringify(body) : "",
    headers: {
      "Content-Type": "application/json",
    },
  };

  aws4.sign(opts, {
    accessKeyId: config.spapi.awsAccessKey,
    secretAccessKey: config.spapi.awsSecretKey,
  });

  return opts;
}

module.exports = { signRequest };