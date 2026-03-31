const axios = require("axios");
const { getAccessToken } = require("./lwaTokenService");
const { signRequest } = require("../utils/awsSignature");
const config = require("../config/env");

async function getCatalogItem(asin) {
  const path = `/catalog/2022-04-01/items?identifiers=${asin}&identifiersType=ASIN&marketplaceIds=${config.spapi.marketplaceId}`;
  const accessToken = await getAccessToken();
  const signedOpts = signRequest(path, "GET");

  try {
    const response = await axios({
      method: signedOpts.method,
      url: `https://${config.spapi.host}${path}`,
      headers: {
        ...signedOpts.headers,
        "x-amz-access-token": accessToken,
      },
    });

    return response.data;
  } catch (err) {
    console.error("SP-API Catalog Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getCatalogItem };