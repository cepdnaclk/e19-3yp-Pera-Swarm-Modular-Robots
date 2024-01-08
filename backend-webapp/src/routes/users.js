const express = require('express');
const router = express.Router();
const User = require('../schemas/user.js');
const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middleware/auth");


router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    // Authenticate user
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token in the database
    // user.refreshToken = refreshToken;
    // await user.save();

    // Send response
    res.json({
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            role: user.type,
            name: user.name,
            email: user.email,
            // Add other user data as needed
        },
    });
});

router.post("/token", (req, res, next)=>{
    //TODO::
    try {
        const refreshToken = req.body.refreshToken;

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
