const express = require("express");
const router = express.Router();
const instance = require("../utils/instance");

router.get(`/product/id`, async (req, res) => {
  try {
    const { query } = req.query;
    if (query.length === 0) {
      return res.status(400).json({
        message: "Nothing to search type something",
        success: false,
      });
    }

    const response = await instance.get(`/products/${query}`);

    return res.status(200).json({
      product: response.data,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
