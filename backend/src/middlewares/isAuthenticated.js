const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect("/unauthenticated");
  return next();
};

module.exports = isAuthenticated;
