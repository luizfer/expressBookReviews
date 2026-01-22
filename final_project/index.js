const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const customer_routes = require('./router/auth_users').authenticated;
const genl_routes = require('./router/general').general;

const app = express();
app.use(express.json());

app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

app.use("/customer/auth/*", (req, res, next) => {
  jwt.verify(
    req.session.authorization?.accessToken,
    "access",
    (err) => err ? res.status(403).json({ message: "Invalid token" }) : next()
  );
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
