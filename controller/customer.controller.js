const express = require("express");
const app = express.Router();
const customerModel = require("../model/customer");

app.get("/", (req, res, next) => {
  customerModel.getAll((err, result) => {
    if (err) {
      console.log("error /customers", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.get("/:customerId", (req, res, next) => {
  const id = req.params.customerId;
  customerModel.findById(id, (err, result) => {
    if (err) {
      console.log("error GET /customers/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.post("/", (req, res, next) => {
  const newCustomer = {
    Name: req.body.name,
    Address: req.body.address,
    Email: req.body.email,
  };
  customerModel.create(newCustomer, (err, result) => {
    if (err) {
      console.log("error POST /customers", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.put("/:customerId", (req, res, next) => {
  const id = req.params.customerId;
  const customer = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
  };
  customerModel.updateById(id, customer, (err, result) => {
    if (err) {
      console.log("error PUT /customers/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.delete("/:customerId", (req, res, next) => {
  const id = req.params.customerId;
  customerModel.remove(id, (err, result) => {
    if (err) {
      console.log("error DELETE /customers/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

module.exports = app;
