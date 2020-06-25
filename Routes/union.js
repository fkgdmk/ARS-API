const express = require('express');
const router = express.Router();
const Address = require('../db/Address');
const Union = require('../db/Union');

router.get("/addresses", async (req, res) => {
    try {
        console.log(req.query.unionId);
        const addresses = await Address.find({ union: req.query.unionId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(400).send({ status: 400, error });
    }
});

router.get("/all", async (req, res) => {
    try {
        const unions = await Union.find();
        res.status(200).json(unions);
    } catch (error) {
        res.status(400).send({ status: 400, error });
    }
});

module.exports = router;