
const express = require ('express');
const router = express.Router();
const secrets = "../../utils/secrets";

const requestRoute = require ("./request");

router.get("/", (_req, res) => {
console.log("heloo")
  res.status(200).json({
    message: "Hello from v1",
  });

});

router.use("/request", requestRoute);

module.exports = router;
