const axios = require("axios");
const aws4 = require("aws4");

async function getInventory() {

  const path = `/fba/inventory/v1/summaries?marketplaceIds=${process.env.MARKETPLACE_ID}`;

  const opts = {
    host: process.env.SP_API_HOST,
    path: path,
    service: "execute-api",
    region: process.env.AWS_REGION,
    method: "GET",
    headers: {
      "x-amz-access-token": process.env.LWA_ACCESS_TOKEN,
      "content-type": "application/json"
    }
  };

  aws4.sign(opts, {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const url = `https://${process.env.SP_API_HOST}${path}`;

  const response = await axios({
    method: "GET",
    url: url,
    headers: opts.headers
  });

  return response.data;
}

module.exports = { getInventory };