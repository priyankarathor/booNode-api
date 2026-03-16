const axios = require("axios");
require("dotenv").config();

async function getAccessToken() {

  const response = await axios.post(
    "https://api.amazon.com/auth/o2/token",
    {
      grant_type: "refresh_token",
      refresh_token: process.env.REFRESH_TOKEN,
      client_id: process.env.LWA_CLIENT_ID,
      client_secret: process.env.LWA_CLIENT_SECRET
    }
  );

  return response.data.access_token;
}

module.exports = { getAccessToken };