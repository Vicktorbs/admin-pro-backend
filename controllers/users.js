const { response } = require("express");
const bcrypt = require('bcryptjs')
const User = require("../models/user");

const getUsers = async(req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    })
}

const createUser = async(req, res = response) => {
    const { password, email } = req.body;

    try {

        const existEmail = await User.findOne({email});

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already used'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save()
    
        res.json({
            ok: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

}

const updateUser = async(req, res) => {
    const uid = req.params.id
    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User ID does not exist'
            })
        }

        // Uodates
        const {password, google, email, ...fields} = req.body;
        if (userDB.email !== email) {
            const existEmail = await User.findOne({email})
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already used by other user'
                })
            }
        }
        fields.email = email

        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true})

        res.json({
            ok: true,
            user: userUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const deleteUser = async(req, res) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User ID does not exist'
            })
        }
        await User.findByIdAndDelete(uid)
        res.json({
            ok: true,
            msg: 'User deleted succesfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'User not deleted, call administrator'
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}