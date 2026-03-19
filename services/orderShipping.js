const axios = require("axios");
const { getAccessToken } = require("../utils/lwaToken");
const config = require("../config/env");

async function getOrderAddress(orderId) {
  try {
    const accessToken = await getAccessToken();

    const url = `https://${config.spapi.host}/orders/v0/orders/${orderId}/address`;

    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "x-amz-access-token": accessToken,
      },
    });

    return res.data; // JSON data of shipping address
  } catch (error) {
    console.error("Error fetching order address:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getOrderAddress };