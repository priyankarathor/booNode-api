const { getOrderAddress } = require("../services/orderShipping");

async function fetchOrderAddress(req, res) {
  try {
    const { orderId } = req.params;
    const data = await getOrderAddress(orderId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { fetchOrderAddress };  // ✅ make sure it's an object with function reference