const { response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token was not found in request'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        })
    }
}

module.exports = {
    validateJWT
}