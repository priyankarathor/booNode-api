const express = require("express");
const router = express.Router();

const { getCatalogItem } = require("../services/catalogService");

router.get("/:asin", async (req, res) => {
  try {

    const data = await getCatalogItem(req.params.asin);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;