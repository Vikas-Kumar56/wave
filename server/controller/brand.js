const { Brand } = require("../models/brand");
exports.brand = function(req, res) {
  const { name } = req.body;
  const brand = new Brand({ name });

  brand.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }

    res.json({ success: true, brand: doc });
  });
};

exports.getAllBrands = function(req, res) {
  Brand.find({}, (err, brands) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.status(200).json({
      success: true,
      brands
    });
  });
};
