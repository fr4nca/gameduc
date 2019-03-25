module.exports = papeis => {
  return (req, res, next) => {
    const { papel } = req.user;
    if (papeis.includes(papel)) {
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
  };
};
