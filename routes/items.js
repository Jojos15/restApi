const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const verifyToken = require('../middlewares/VerifyToken');

//!
//TODO: Use VerifyToken
//!

router.get('/', async (req, res) => {
    try {
        const allItems = await Item.find();
        res.json(allItems);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});

router.get('/:itemId', async (req, res) => {
    try {
        const specificItem = await Item.findById(req.params.itemId);
        res.json(specificItem);
    }
    catch (err) {
        res.status(500).send({ message: error });
    }
});

router.post('/', async (req, res) => {
    try {
        const toSave = new Item({
            name: req.body.name,
            fullname: req.body.fullname,
            code: req.body.code,
            quantity: req.body.quantity,
            supplierid: req.body.supplierid,
        });

        const savedItem = await toSave.save();
        res.json(savedItem);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});

router.patch('/:itemId', async (req, res) => {
    try {
        let updatedItem;
        for (let i = 0; i < req.body.length; i++) {
            let lelement = { [req.body[i].property]: req.body[i].value }
            updatedItem = await Item.findByIdAndUpdate(req.params.itemId, { $set: lelement }, { new: true });
        }
        res.json(updatedItem);
    }
    catch (err) {
        res.status(500).send({ message: error });
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
        const deletedItem = await User.findByIdAndDelete(req.params.itemId);
        res.json(deletedItem);
    }
    catch (err) {
        res.status(500).send({ message: error });
    }
});

module.exports = router;