const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname } = res.json;

  await userModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });
});
userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signin endpoint",
  });
});
userRouter.get("/purchase", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
