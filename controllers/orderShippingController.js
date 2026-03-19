const { getOrderAddress } = require("../services/orderShipping");

async function fetchOrderAddress(req, res) {
  try {
    const { orderId } = req.body; // get orderId from POST body
    if (!orderId) {
      return res.status(400).json({ error: "orderId is required in request body" });
    }

    const data = await getOrderAddress(orderId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { fetchOrderAddress };