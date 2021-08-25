const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        // Verify email
        const userDB = await User.findOne({email});
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid Data'
            })
        }
        // Verify email
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Invalid compare Data'
            })
        }
        // Generate token - JWT
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const googleSignIn = async(req, res) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email })
        let user;

        if (!userDB) {
            // If user does not exist
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            // User exists
            user = userDB;
            user.google = true;
        }

        // Save on DB
        await user.save();
        // Generate token - JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrect'
        })
    }
}

const renewToken = async(req, res) => {
    const uid = req.uid;

    // Generate token - JWT
    const token = await generateJWT(uid);

    // get user ID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}