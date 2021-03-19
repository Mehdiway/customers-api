require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

const customerController = require("./controller/customer.controller");
const ordersController = require("./controller/orders.controller");

app.use(express.json());

app.use("/customers", customerController);
app.use("/orders", ordersController);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.post("/login", (req, res) => {
  console.log(req.body, req.body.email);
  res.status(200).send(req.body.email);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}/`);
});
