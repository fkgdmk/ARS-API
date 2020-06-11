const express = require("express");
const path = require("path");
const xlsx = require('node-xlsx');
const app = express();
const port = process.env.PORT || "8000";
const connectToDb = require('./db/Connection');
const cors = require('cors')
const mongoose = require('mongoose');
const Report = require('./db/Report');
const Address = require('./db/Address');
const Union = require('./db/Union');
const Writer = require('./FileWriter/Writer');
const createReportName = require('./utilities/HelperFunctions')

app.use(cors())
app.use(express.json({ extended: false }))
connectToDb();
console.log("test")
app.get("/", (req, res) => {
    res.status(200);
});

const yearIndexEnum = { '2020': 2, '2019': 4, '2018': 6, '2017': 8, '2016': 10, '2015': 12, '2014': 14, '2013': 16, '2012': 18, '2011': 20, '2010': 22 };
const impairmentIndexEnum = { '5': 2, '10': 3, '20': 4, '30': 5, '50': 6 };
app.get("/getHourlySalary", (req, res) => {
    try {
        const workSheetsFromFile = xlsx.parse(`${__dirname}/Nedskrivningstabel.xlsx`);
        const year = req.query.year;
        const hourlySalary = Math.trunc(workSheetsFromFile[0].data[yearIndexEnum[year]][7])
        res.status(200).send({ hourlySalary });
    } catch (e) {
        res.status(400).send({ error: 'Year doesnt exist' })
    }
});

app.get("/getImpairmentValues", (req, res) => {
    try {
        const workSheetsFromFile = xlsx.parse(`${__dirname}/Nedskrivningstabel.xlsx`);
        const year = req.query.year;
        const impairmentCurve = req.query.impairmentCurve;

        const hourlySalary = Math.trunc(workSheetsFromFile[0].data[yearIndexEnum[year]][7])

        if (impairmentCurve) {
            const impairmentPercentage = workSheetsFromFile[0].data[yearIndexEnum[year]][impairmentIndexEnum[impairmentCurve]]
            return res.status(200).send({ impairmentPercentage, hourlySalary });
        }
        return res.status(200).send({ hourlySalary })

    } catch (e) {
        res.status(400).send({ error: 'Error' })
    }
});

app.post("/report", async (req, res) => {
    try {
        let report = {};
        report.addressId = mongoose.Types.ObjectId(req.body.generalInformation.addressId);
        report.generalInformation = req.body.generalInformation;
        report.improvements = req.body.improvements;
        report.maintenanceAreas = req.body.maintenanceAreas;
        let reportModel = new Report(report);
        await reportModel.save();

        // const address = await Address.findById(report.addressId).populate('union').exec();
        // report.generalInformation.address = address.streetName + " " + address.number;
        // report.generalInformation.housingUnion = address.union.name;
        // const writer = new Writer();
        // await writer.createNewReport(report);

        res.status(200).send({ status: 200, id: reportModel._id });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 400, error });
    }
});

app.get("/report", async (req, res) => {
    const report = await Report.findById(req.query.id);
    // const writer = new Writer();
    // const reportName = writer.createNewReport(report);
    // const file = `${__dirname}/Sheets/` + reportName + ``;
    // console.log(file);
    // res.download(file); // Set disposition and send it.
    if (report) {
        res.status(200).json(report);
    } else {
        res.status(404);
    }
});

app.delete("/report", async(req, res) => {
    try {
        Report.deleteOne({_id: mongoose.Types.ObjectId(req.query.id)}, () => {
            res.status(200).send();
        })
    } catch(e) {
        res.status(400);
    }
});

app.get("/unionsAddresses", async (req, res) => {
    try {
        console.log(req.query.unionId);
        const addresses = await Address.find({ union: req.query.unionId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(400).send({ status: 400, error });
    }
});

app.get("/unions", async (req, res) => {
    try {
        const unions = await Union.find();
        res.status(200).json(unions);
    } catch (error) {
        res.status(400).send({ status: 400, error });
    }
});



app.get("/report/download", async (req, res) => {
    console.log("id", req.query.id);
    const report = await Report.findById(req.query.id);
    const reportName = createReportName(report.generalInformation);
    const file = `${__dirname}/Sheets/` + reportName + ``;
    console.log(file);
    res.status(200).send({ url: file }); // Set disposition and send it.
});



app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;