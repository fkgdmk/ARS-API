const XlsxPopulate = require('xlsx-populate');
const moment = require('moment');
var path = require('path');
const GeneralInformationWriter = require('./GeneralInformationWriter');
const MaintenanceWriter = require('./MaintenanceWriter');
const ImprovementsWriter = require('./ImprovementsWriter');

class Writer {
    createNewReport (report) {
        return new Promise ((resolve, rej) => {
            const inputFilePath = path.join(__dirname, '..', 'Sheets', 'ReportDraft.xlsx');
            XlsxPopulate.fromFileAsync(inputFilePath)
            .then(workbook => {
                const { generalInformation, maintenanceAreas, improvements } = report; 
    
                const generalInformationSheet = workbook.sheet("Side 1");
                const GIwriter = new GeneralInformationWriter();
                GIwriter.addDetailsToSheet(generalInformationSheet, generalInformation);
    
                const maintenanceSheet = workbook.sheet("Side 3 - Vedligehold");
                const MAINTwriter = new MaintenanceWriter();
                MAINTwriter.addDetailsToSheet(maintenanceSheet, maintenanceAreas);
    
                const improvementsSheet = workbook.sheet("Side2.1");
                const IMPRwriter = new ImprovementsWriter();
                IMPRwriter.addDetailsToSheet(improvementsSheet, improvements);
    
                const reportName = generalInformation.address + '-' + GIwriter.formatDate(generalInformation.reviewDate) + '.xlsx';
                console.log("reportName", reportName)
                const outputFilePath = path.join(__dirname, '..', 'Sheets', reportName);
                workbook.toFileAsync(outputFilePath).then(res => {
                    resolve(reportName);
                })
            });
        });
    }
}

module.exports = Writer;