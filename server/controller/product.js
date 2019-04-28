const { Product } = require("../models/product");
const mongoose = require("mongoose");
exports.createProduct = function(req, res) {
  req.body.createdBy = req.user._id;
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.json({ success: true, article: doc });
  });
};

exports.getArticleById = function(req, res) {
  let type = req.query.type;
  let items = req.query.id;

  if (type == "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, docs) => {
      if (err) {
        return res.json({ success: false, err });
      }
      if (docs.length == 0) {
        return res.json({
          success: false,
          message: "No article found for these ids."
        });
      }

      res.status(200).json({ articles: docs });
    });
};

exports.getAllArticles = function(req, res) {
  // get sort,order and limit query
  let { sortBy, order, limit } = req.query;
  if (!sortBy) {
    sortBy = "_id";
  }
  if (!order) {
    order = "asc";
  }
  if (!limit) {
    limit = 4;
  }

  Product.find()
    .populate("wood")
    .populate("brand")
    .sort([[sortBy, order]])
    .limit(+limit)
    .exec((err, docs) => {
      if (err) {
        return res.json({ success: false, err });
      }
      res.json({ success: true, articles: docs });
    });
};

exports.getShop = function(req, res) {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? +req.body.limit : 100;
  let skip = +req.body.skip;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key == "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("wood")
    .populate("brand")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (err) {
        return res.json({ success: false, err });
      }
      res.json({ success: true, shop: docs });
    });
};
