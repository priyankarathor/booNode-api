require("dotenv").config();

const express = require("express");
const axios = require("axios");
const aws4 = require("aws4");
const qs = require("qs");
const app = express();


const inventoryRoutes = require("./routes/inventoryRoutes");

const catalogRoutes = require("./routes/catalogRoutes");
app.use(express.json());
const ordersRoutes = require("./routes/ordersRoutes");
const ordershippingRoute = require("./routes/ordersShippingRoute");

// ---------------- AMAZON TEST ----------------
app.get("/amazonTest", async (req, res) => {
  try {

    console.log("Refresh token:", process.env.LWA_REFRESH_TOKEN);

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
      path: "/sellers/v1/marketplaceParticipations",
      service: "execute-api",
      region: "eu-west-1",
      method: "GET",
      headers: {
        "x-amz-access-token": accessToken,
        "Content-Type": "application/json"
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

    res.json(response.data);

  } catch (error) {

    console.log("Amazon Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Amazon API error",
      error: error.response?.data || error.message
    });

  }
});


app.use("/catalog", catalogRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api", ordersRoutes);

app.use("/api/orderShipping",ordershippingRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});