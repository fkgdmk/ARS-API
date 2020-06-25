const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const report = new mongoose.Schema({
    addressId : {
        type : Schema.Types.ObjectId, ref: 'address',
    },
    generalInformation: {
        owner : {
            type: String,
        },
        isBuyer : {
            type: Boolean,
        },
        caseNumber : {
            type: String
        },
        reviewDate : {
            type: Date,
        },
        lastReportDate : {
            type: Date,
        },
        takeOverDate : {
            type: Date,
        },
        persons : {
            type: Array,
        },
        movedOut : {
            type: Boolean
        },
        reconstruction : {
            type: Boolean,
        },
        reconstructionByCurrentOwner : {
            type: Boolean,
        },
        reconstructionByFormerOwner : {
            type: Boolean,
        },
        approvals : {
            type: Array,
        },
        remarks : {
            type: Array,
        },
    }, 
    improvements : {
        general: {
            type: Array
        },
        kitchen: {
            type: Array
        },
        bathroom: {
            type: Array
        },
        hall: {
            type: Array
        },
        livingroom: {
            type: Array
        }
    },
    maintenanceAreas : {
        general: {
            type: Array,
        },
        kitchen: {
            type: Array,
        },
        bathroom: {
            type: Array,
        },
        hall: {
            type: Array,
        },
        livingroom: {
            type: Array,
        }
    }
});

module.exports = Report = mongoose.model('report', report);