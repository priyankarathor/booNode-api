const { getOrders } = require("../services/ordersService");

async function fetchOrders(req, res) {
  try {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "startDate and endDate are required"
      });
    }

    const data = await getOrders(startDate, endDate);

    res.json(data);

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = { fetchOrders };