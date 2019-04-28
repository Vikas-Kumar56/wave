const { User } = require("../models/user");

module.exports = function(req, res, next) {
  const token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) {
      return res.json({ isAuth: false, err });
    }
    if (!user) {
      return res.json({ isAuth: false, err });
    }

    req.token = token;
    req.user = user;
    next();
  });
};
