const { Wood } = require("../models/wood");

exports.createWood = function(req, res) {
  const { name } = req.body;
  const wood = new Wood({
    name,
    createdDate: new Date(),
    createdBy: req.user._id
  });

  wood.save((err, doc) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    res.json({ success: true, wood: doc });
  });
};

exports.getAllWoods = function(req, res) {
  Wood.find({})
    .populate("createdBy")
    .exec((err, woods) => {
      if (err) {
        return res.json({ success: false, err });
      }
      res.json({ success: true, woods });
    });
};
