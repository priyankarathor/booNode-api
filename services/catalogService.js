const axios = require("axios");
const aws4 = require("aws4");
const qs = require("qs");

async function getCatalogItem(asin) {

  const tokenResponse = await axios.post(
    "https://api.amazon.com/auth/o2/token",
    qs.stringify({
      grant_type: "refresh_token",
      refresh_token: process.env.LWA_REFRESH_TOKEN,
      client_id: process.env.LWA_CLIENT_ID,
      client_secret: process.env.LWA_CLIENT_SECRET
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  const accessToken = tokenResponse.data.access_token;

  const opts = {
    host: "sellingpartnerapi-eu.amazon.com",
    path: `/catalog/2022-04-01/items?identifiers=${asin}&identifiersType=ASIN&marketplaceIds=${process.env.MARKETPLACE_ID}`,
    service: "execute-api",
    region: "eu-west-1",
    method: "GET",
    headers: {
      "x-amz-access-token": accessToken
    }
  };

  aws4.sign(opts, {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });

  const response = await axios({
    method: opts.method,
    url: `https://${opts.host}${opts.path}`,
    headers: opts.headers
  });

  return response.data;
}

module.exports = { getCatalogItem };