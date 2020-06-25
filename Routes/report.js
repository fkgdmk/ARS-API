const express = require('express');
const router = express.Router();
const Report = require('../db/Report');
const Writer = require('../FileWriter/Writer');
const createReportName = require('../utilities/HelperFunctions')
const mongoose = require('mongoose');

router.post("/", async (req, res) => {
    try {
        let report = {};
        report.addressId = mongoose.Types.ObjectId(req.body.generalInformation.addressId);
        report.generalInformation = req.body.generalInformation;
        report.improvements = req.body.improvements;
        report.maintenanceAreas = req.body.maintenanceAreas;
        let reportModel = new Report(report);
        await reportModel.save();
        //Create report
        const address = await Address.findById(report.addressId).populate('union').exec();
        report.generalInformation.address = address.streetName + " " + address.number;
        report.generalInformation.housingUnion = address.union.name;
        const writer = new Writer();
        await writer.createNewReport(report);

        res.status(200).send({ status: 200, id: reportModel._id });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, error });
    }
});

router.get("/", async (req, res) => {
    try {
        const report = await Report.findById(req.query.id)
        res.status(200).json(report);
    } catch (err) {
        res.status(404);
    }
});

router.delete("/", async(req, res) => {
    try {
        Report.deleteOne({_id: mongoose.Types.ObjectId(req.query.id)}, () => {
            res.status(200).send();
        })
    } catch(e) {
        res.status(400);
    }
});

router.get("/download", async (req, res) => {
    console.log("id", req.query.id);
    const report = await Report.findById(req.query.id);
    const reportName = createReportName(report.generalInformation);
    const file = `${__dirname}/Sheets/` + reportName + ``;
    console.log(file);
    res.status(200).send({ url: file }); // Set disposition and send it.
});


module.exports = router;