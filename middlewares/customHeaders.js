module.exports = (req, res, next) => {
  req.headers["if-none-match"] = "no-match-for-this";

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};
