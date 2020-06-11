const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const report = new mongoose.Schema({
    addressId : {
        type : Schema.Types.ObjectId, ref: 'address',
    },
    generalInformation: {
        owner : {
            type: String,
            // required: true
        },
        isBuyer : {
            type: Boolean,
            // required: true
        },
        caseNumber : {
            type: String
        },
        reviewDate : {
            type: Date,
            // required: true
        },
        lastReportDate : {
            type: Date,
            // required: true
        },
        takeOverDate : {
            type: Date,
            // required: true
        },
        persons : {
            type: Array,
            // required: true
        },
        movedOut : {
            type: Boolean
        },
        reconstruction : {
            type: Boolean,
            // required: true
        },
        reconstructionByCurrentOwner : {
            type: Boolean,
            // required: true
        },
        reconstructionByFormerOwner : {
            type: Boolean,
            // required: true
        },
        approvals : {
            type: Array,
            // required: true
        },
        remarks : {
            type: Array,
            // required: true
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
            // required: true
        },
        kitchen: {
            type: Array,
            // required: true
        },
        bathroom: {
            type: Array,
            // required: true
        },
        hall: {
            type: Array,
            // required: true
        },
        livingroom: {
            type: Array,
            // required: true
        }
    }
});

module.exports = Report = mongoose.model('report', report);