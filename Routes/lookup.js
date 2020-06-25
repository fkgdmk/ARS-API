const express = require('express');
const router = express.Router();
const xlsx = require('node-xlsx');

const yearIndexEnum = { '2020': 2, '2019': 4, '2018': 6, '2017': 8, '2016': 10, '2015': 12, '2014': 14, '2013': 16, '2012': 18, '2011': 20, '2010': 22 };
const impairmentIndexEnum = { '5': 2, '10': 3, '20': 4, '30': 5, '50': 6 };

router.get("/getHourlySalary", (req, res) => {
    try {
        const workSheetsFromFile = xlsx.parse(`${__dirname}/../Nedskrivningstabel.xlsx`);
        const year = req.query.year;
        console.log("row", yearIndexEnum[year])
        const hourlySalary = Math.trunc(workSheetsFromFile[0].data[yearIndexEnum[year]][7]) 
        res.status(200).send({ hourlySalary });
    } catch (e) {
        res.status(400).send({ error: 'Year doesnt exist' })
    }
});

router.get("/getImpairmentValues", (req, res) => {
    try {
        const workSheetsFromFile = xlsx.parse(`${__dirname}/../Nedskrivningstabel.xlsx`);
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

module.exports = router;
