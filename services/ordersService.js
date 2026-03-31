const axios = require("axios");
const config = require("../config/env");
const { signRequest } = require("../utils/awsSignature");
const { getAccessToken } = require("./lwaTokenService");

async function getOrders(startDate, endDate, retries = 3) {
  try {
    const token = await getAccessToken();

    const path = `/orders/v0/orders?MarketplaceIds=${config.spapi.marketplaceId}&CreatedAfter=${startDate}&CreatedBefore=${endDate}`;

    const signed = signRequest(path, "GET");

    signed.headers["x-amz-access-token"] = token;
    signed.headers["host"] = config.spapi.host;

    const url = `https://${config.spapi.host}${path}`;

    const response = await axios({
      url,
      method: "GET",
      headers: signed.headers,
    });

    return response.data;

  } catch (error) {

    // Retry when rate limit hit
    if (error.response && error.response.status === 429 && retries > 0) {
      console.log("Rate limit hit. Retrying after 3 seconds...");
      await new Promise(r => setTimeout(r, 3000));
      return getOrders(startDate, endDate, retries - 1);
    }

    throw error;
  }
}

module.exports = { getOrders };