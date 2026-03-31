const axios = require("axios");
const qs = require("qs");
const config = require("../config/env");

async function getAccessToken() {
  const url = "https://api.amazon.com/auth/o2/token";

  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: config.spapi.refreshToken,
    client_id: config.spapi.clientId,
    client_secret: config.spapi.clientSecret,
  });

  const res = await axios.post(url, data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return res.data.access_token;
}

module.exports = { getAccessToken };