const { response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

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

const validateADMIN_ROLE = async(req, res = response, next) => {

    const uid = req.uid;

    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No permisison for this action'
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Invalid request, call admin'
        })
    }
}

const validateADMIN_ROLE_SelfUser = async(req, res = response, next) => {

    const uid = req.uid;
    const id =  req.params.id;

    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            })
        }
        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No permisison for this action'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Invalid request, call admin'
        })
    }
}

module.exports = {
    validateJWT,
    validateADMIN_ROLE,
    validateADMIN_ROLE_SelfUser
}