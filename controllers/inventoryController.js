const { getListingItem } = require("../services/inventoryService");

async function fetchListing(req, res) {
  try {
    const { sku } = req.params;
    const data = await getListingItem(sku);
    res.json(data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      message: "Error fetching listing",
      error: err.response?.data || err.message,
    });
  }
}

module.exports = { fetchListing };