const jwt = require('jsonwebtoken');

// Function To Check If User Token Is Found
exports.authToken = (req, res, next) => {
    // Get Token To Check
    const token = req.header('auth-token');
    // If Not Token Refuesd Res
    if(!token) return res.status(401).send('Access Denied');
    // If IS ToKen
    // Check This Token Expired
    try {
        // If Token Expired
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        // If Token Not Expired User Login Agin
        res.status(400).send('Inviled Token');
    }
};