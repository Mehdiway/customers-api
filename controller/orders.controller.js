const express = require("express");
const app = express.Router();
const orderModel = require("../model/orders");

app.get("/", (req, res, next) => {
  orderModel.getAll((err, result) => {
    if (err) {
      console.log("error /orders", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  orderModel.findById(id, (err, result) => {
    if (err) {
      console.log("error GET /orders/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.post("/", (req, res, next) => {
  const newOrder = {
    Description: req.body.description,
    Price: req.body.price,
    CustomerID: req.body.customerId,
  };
  orderModel.create(newOrder, (err, result) => {
    if (err) {
      console.log("error POST /orders", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.put("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  const order = {
    description: req.body.description,
    price: req.body.price,
    customerId: req.body.customerId,
  };
  orderModel.updateById(id, order, (err, result) => {
    if (err) {
      console.log("error PUT /orders/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  orderModel.remove(id, (err, result) => {
    if (err) {
      console.log("error DELETE /orders/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

module.exports = app;
