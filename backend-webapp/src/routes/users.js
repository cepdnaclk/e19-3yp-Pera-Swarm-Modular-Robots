const express = require('express');
const router = express.Router();

router.post("/login", (req, res, next)=>{
  // TODO
  console.log("Logged In");
});

router.post("/token", (req, res, next)=>{
  // TODO
  console.log("Token Refreshed");
});

router.delete("/logout", (req, res, next)=>{
  // TODO
  console.log("Logged Out");
});

module.exports = router;
