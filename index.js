require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

const customerController = require("./controller/customer.controller");
const ordersController = require("./controller/orders.controller");
const userController = require("./controller/user.controller");
const userModel = require("./model/users");

app.use(express.json());

/*app.use((req, res, next) => {
  // -----------------------------------------------------------------------
  // authentication middleware

  const auth = { email: "omar.beladraoui@gmail.com", password: "123456" }; // change this

  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [email, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  console.log("got", auth, email, password);

  // Verify email and password are set and correct
  if (email && password) {
    userModel.findByEmail(email, (err, user) => {
      if (err) {
        console.log(`can't find user with email ${email}`, err);
        next(err);
        return;
      }

      if (user.password === password) {
        // Access granted...
        return next();
      } else {
        ERROR;
      }
    });
  }

  // Access denied...
  res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
  res.status(401).send("Authentication required."); // custom message

  // -----------------------------------------------------------------------
});*/

app.use("/customers", customerController);
app.use("/orders", ordersController);
app.use("/users", userController);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}/`);
});
