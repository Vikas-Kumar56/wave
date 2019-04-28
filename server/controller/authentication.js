const { User } = require("../models/user");
const mongoose = require("mongoose");
exports.signin = function(req, res, next) {
  //find email
  let { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }

    if (!user) {
      return res.json({
        success: false,
        message: { email: "Auth failed, email not register" }
      });
    }
    // match password
    console.log(user);
    user.comparePassword(password, (err, isMatch) => {
      console.log(password, isMatch);
      if (err) {
        return res.json({ success: false, err, isAuth: false });
      }
      if (!isMatch) {
        return res.json({
          success: false,
          isAuth: false,
          message: { password: "password does not match" }
        });
      }

      user.generateToken((err, userWithToken) => {
        if (err) {
          return res.json({ success: false, err, isAuth: false });
        }
        res
          .cookie("w_auth", userWithToken.token)
          .status(200)
          .json({
            success: true,
            isAuth: true,
            name: userWithToken.name,
            lastname: userWithToken.lastname,
            email: userWithToken.email,
            isAdmin: userWithToken.role === 1 ? true : false,
            cart: userWithToken.cart,
            history: userWithToken.history,
            isAuth: true
          });
      });
    });
  });
};

exports.register = function(req, res, next) {
  const user = new User(req.body);
  // validate user data
  User.findOne({ email: user.email }, (err, doc) => {
    console.log(doc);
    if (doc) {
      return res.json({
        success: false,
        err: { email: "Email already taken." }
      });
    } else {
      if (user.password.length <= 5) {
        return res.json({
          success: false,
          err: { password: "Password length should be greater than 5" }
        });
      }
      // save in mongo db
      user.save((err, doc) => {
        if (err) {
          return res.json({ success: false, err });
        }
        res.status(200).json({
          success: true,
          userdata: doc
        });
      });
    }
  });
};

exports.signOut = function(req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, isAuth: false });
  });
};

exports.addToCart = function(req, res) {
  console.log("inside cart api");
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findByIdAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, doc) => {
          if (err) {
            return res.json({ success: false });
          }
          res.json({ success: true, cart: doc.cart });
        }
      );
    } else {
      User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) {
            return res.json({ success: false });
          }
          res.json({ success: true, cart: doc.cart });
        }
      );
    }
  });
};
