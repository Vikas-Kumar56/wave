const mongoose = require("mongoose");

const WoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  createdDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const Wood = mongoose.model("Wood", WoodSchema);

module.exports = { Wood };
