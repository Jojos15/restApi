const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const verifyToken = require('../middlewares/VerifyToken');

//! Task
//TODO: Use VerifyToken
//!

router.get('/', async (req, res) => {
    try {
        const allSuppliers = await Supplier.find();
        res.json(allSuppliers);
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});

router.get('/:supplierId', async (req, res) => {
    try {
        const specificSupplier = await Supplier.findById(req.params.supplierId);
        res.json(specificSupplier);
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});

router.post('/', async (req, res) => {
    try {
        const supplierToSave = new Supplier({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });

        const savedSupplier = await supplierToSave.save();
        res.json(savedSupplier);
    }
    catch (error) {
        res.status(400).send({ message: error });
    }
});

router.patch('/:supplierId', async (req, res) => {
    try {
        let toUpdate;
        for (let i = 0; i < req.body.length; i++) {
            let lelement = { [req.body[i].property]: req.body[i].value }
            toUpdate = await Supplier.findByIdAndUpdate(req.params.supplierId, { $set: lelement }, { new: true });
        }
        res.json(toUpdate);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});

router.delete('/:supplierId', async (req, res) => {
    try {
        const deletedSupplier = await User.findByIdAndDelete(req.params.supplierId);
        res.json(deletedSupplier);
    }
    catch (error) {
        res.status(500).send({ message: error });
    }
});

module.exports = router;