module.exports = function(req, res, next) {
  if (req.user.role === 0) {
    return res.json({
      success: false,
      message: "for this operation need admin rights"
    });
  }
  next();
};
