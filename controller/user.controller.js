const express = require("express");
const app = express.Router();
const userModel = require("../model/users");

app.get("/", (req, res, next) => {
  userModel.getAll((err, result) => {
    if (err) {
      console.log("error /users", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel.findByEmail(email, (err, result) => {
    if (err) {
      console.log("error POST /users/login", err);
      if (err.kind === "not_found") err.statusCode = 404;
      next(err);
      return;
    }
    console.log(result);
    if (result.Email === email && result.Password === password) {
      res.json(result);
    } else {
      console.log("Wrong username or password", result, email, password);
      next("Wrong username or password");
      return;
    }
  });
});

app.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  userModel.findById(id, (err, result) => {
    if (err) {
      console.log("error GET /users/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.post("/", (req, res, next) => {
  const newUser = {
    Email: req.body.email,
    Password: req.body.password,
  };
  userModel.create(newUser, (err, result) => {
    if (err) {
      console.log("error POST /users", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.put("/:userId", (req, res, next) => {
  const id = parseInt(req.params.userId);
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  userModel.updateById(id, user, (err, result) => {
    if (err) {
      console.log("error PUT /users/id", err);
      console.log(id, user);
      next(err);
      return;
    }
    res.json(result);
  });
});

app.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  userModel.remove(id, (err, result) => {
    if (err) {
      console.log("error DELETE /users/id", err);
      next(err);
      return;
    }
    res.json(result);
  });
});

module.exports = app;
