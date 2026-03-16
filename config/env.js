require("dotenv").config();

module.exports = {
  port: process.env.PORT,

  lwa: {
    clientId: process.env.LWA_CLIENT_ID,
    clientSecret: process.env.LWA_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  },

  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    region: process.env.REGION
  },

  spapi: {
    host: process.env.SP_API_HOST,
    marketplaceId: process.env.MARKETPLACE_ID
  }
};