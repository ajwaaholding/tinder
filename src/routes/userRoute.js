const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewears/verify");

router.get("/user/requests", userAuth, async (req, res) => {
  // get all connections and give it to user
});

module.exports = router;
