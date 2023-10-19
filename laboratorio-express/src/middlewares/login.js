const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const login = express();

const users = [
  { email: "admin@example.com", name: "admin", rol: "admin" },
  { email: "user@example.com", name: "user", rol: "user" },
];

function JWTValidation(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("invalid Token");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json("Unauthorized Token");
    } else {
      req.headers = { ...req.headers, rol: decoded.rol };
      next();
    }
  });
}

login.post("/", JWTValidation, (req, res) => {
  const { email, name, rol } = req.body;

  const user = users.find(
    email === users.email && name === users.name && rol === users.rol
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid user" });
  }

  const token = jwt.sign(user, SECRET_KEY);
});

module.exports = login;
