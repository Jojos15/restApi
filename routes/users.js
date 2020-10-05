const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('./verifyToken');


//GET ROUTE
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(req.userId);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//GET BY _ID
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const specificUser = await User.findById(req.params.userId);
        res.json(specificUser);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//UPDATE A USER
router.patch('/:userId', async (req, res) => {
    try {
        console.log(req.body.length);
        for (let i = 0; i < req.body.length; i++) {
            let lelement = { [req.body[i].property]: req.body[i].value }
            const savedUser = await User.findByIdAndUpdate(req.params.userId, { $set: lelement });
        }
        const newUser = await User.findById(req.params.userId);
        res.json(newUser);
    }
    catch (err) {
        res.json({ message: err });
    }
});

//DELETE A USER
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        res.json(deletedUser);
    }
    catch (err) {
        res.json({ message: err });
    }
});

module.exports = router; 