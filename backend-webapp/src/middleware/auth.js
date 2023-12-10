const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (token == null)
            return res.sendStatus(401).json({ error: "Unauthorized" });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
            if (err) throw err;
            req.userId = userId;
            next();
        });
    } catch (err) {
        //next(err);
        if (err.name === 'TokenExpiredError') {
            return res.sendStatus(401).json({ error: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.sendStatus(401).json({ error: 'Invalid token' });
        } else {
            return res.sendStatus(401).json({ error: 'Token verification failed' });
        }
    }

}

function generateAccessToken(id){
    return jwt.sign(
        { id: id },
        process.env.ACCESS_TOKEN_SECRET,
        {
         expiresIn: "1h",
        }
    );
}

function generateRefreshToken(id){
    return jwt.sign(
        { id: id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d",
        }
    );
}


module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshToken,
};
