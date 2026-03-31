const axios = require("axios");
const { getAccessToken } = require("./lwaTokenService");
const { signRequest } = require("../utils/awsSignature");
const config = require("../config/env");

async function getListingItem(sellerSKU) {
  const accessToken = await getAccessToken();
  const path = `/listings/2021-08-01/items/${sellerSKU}?marketplaceIds=${config.spapi.marketplaceId}`;

  // sign request
  const signedOpts = signRequest(path, "GET");

  // add LWA token to headers
  signedOpts.headers["x-amz-access-token"] = accessToken;

  const url = `https://${signedOpts.host}${signedOpts.path}`;
  const response = await axios.get(url, { headers: signedOpts.headers });
  return response.data;
}

module.exports = { getListingItem };