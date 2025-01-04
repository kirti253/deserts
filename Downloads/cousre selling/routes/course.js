const { Router } = require("express");
const courseRouter = Router();
courseRouter.post("/puchase", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});
courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "signup preview endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
