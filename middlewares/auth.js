const users = require("../models/users.js");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = users.find(u => u.name = decoded.name);
        next();
        
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;