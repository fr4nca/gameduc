module.exports = papeis => {
  return (req, res, next) => {
    const { user } = req;
    if (papeis.includes(user.papel)) {
      next();
    } else {
      return res.status(403).json({ msg: "Forbidden" });
    }
  };
};
