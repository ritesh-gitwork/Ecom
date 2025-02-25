const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.roles)) {
      return res.status(403).json({ message: "access denied " });
    }
    next();
  };
};

module.exports = authorizeRoles;
