const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (context) => {
  const token = context.req.headers.bearer;
  if (token) {
    try {
      const user = jwt.verify(token, SECRET_KEY);
      return user;
    } catch (error) {
      throw new AuthenticationError("Invalid/Expired token");
    }

  }
  throw new Error("Authorization header must be provided");
};
