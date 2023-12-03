const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middleware/auth");


router.post("/login", (req, res, next)=>{
    console.log("Logged In");


    //TODO::
    // for successful login, proceed with further actions
    // 1. Generate access token and refresh token
    // 2. Save user id/name with refresh token on database as currently logged users
    // 3. send userdata, refresh token and access token as a response

    //const accessToken = generateAccessToken(userId);
    //const refreshToken = generateRefreshToken(userId);



    //res.json({
    //    accessToken: accessToken,
    //    refreshToken: refreshToken,
    //    // others
    //});

});

router.post("/token", (req, res, next)=>{
    //TODO::
    try {
        const refreshToken = req.cookies.jwt;

        if (refreshToken == null)
            return res.sendStatus(401).json({ error: "Unauthorized" });
        if (/* check if that refresh token is present in db*/ true) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, id) => {
                if (err) throw err;
                const accessToken = generateAccessToken(id);
                return res.status(200).json({ accessToken: accessToken });
            });
        }
    } catch (err) {
        next(err);
    }

});

router.delete("/logout", (req, res, next)=>{
  // TODO
  // 1. Delete refresh token from database

  console.log("Logged Out");
});

module.exports = router;
