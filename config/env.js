require("dotenv").config(); // ← load .env

module.exports = {
  spapi: {
    host: "sellingpartnerapi-eu.amazon.com",
    region: process.env.REGION || "eu-west-1",
    clientId: process.env.LWA_CLIENT_ID,
    clientSecret: process.env.LWA_CLIENT_SECRET,
    refreshToken: process.env.LWA_REFRESH_TOKEN,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    roleArn: process.env.AWS_ROLE_ARN,
    marketplaceId: process.env.MARKETPLACE_ID,
  },
  port: process.env.PORT || 3000,
};