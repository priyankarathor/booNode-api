const axios = require("axios");
const config = require("../config/env");

async function getAccessToken() {
  const res = await axios.post(
    "https://api.amazon.com/auth/o2/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.spapi.refreshToken,
      client_id: config.spapi.clientId,
      client_secret: config.spapi.clientSecret,
    })
  );

  return res.data.access_token;
}

module.exports = { getAccessToken };