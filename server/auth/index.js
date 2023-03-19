const jwt = require("jsonwebtoken");
const debug = "auth-index";
function authManager() {
  verify = (req, res, next) => {
    try {
      const token = req.cookies.token;
      console.log(debug, 7, req.cookies);
      console.log(debug, 8, "printing the request obj", req);

      if (!token) {
        return res.status(401).json({
          loggedIn: false,
          user: null,
          errorMessage: "Unauthorized",
        });
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log("verified.userId: " + verified.userId);
      req.userId = verified.userId;
      req.username = verified.username;

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        loggedIn: false,
        user: null,
        errorMessage: "Unauthorized",
      });
    }
  };

  verifyUser = (req) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return null;
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken.userId;
    } catch (err) {
      return null;
    }
  };

  signToken = (userId, username) => {
    return jwt.sign(
      {
        userId: userId,
        username: username,
      },
      process.env.JWT_SECRET
    );
  };

  return this;
}

const auth = authManager();
module.exports = auth;
