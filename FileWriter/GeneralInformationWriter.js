const moment = require('moment');

class GeneralInformationWriter {

    addDetailsToSheet(sheet, generalInformation) {
        sheet.cell("B4").value(generalInformation.housingUnion);
        sheet.cell("B5").value(generalInformation.address);
        sheet.cell("B6").value(generalInformation.owner);

        sheet.cell("K5").value(this.formatDate(new Date()));
        sheet.cell("K7").value(this.formatDate(generalInformation.reviewDate));

        this.addPresentPersons(sheet, generalInformation.persons);

        sheet.cell("K26").value(this.formatDate(generalInformation.lastReportDate));
        sheet.cell("H28").value(this.formatDate(generalInformation.takeOverDate));

        sheet.cell("C29").value(generalInformation.isBuyer ? 'X' : '');
        sheet.cell("C30").value(!generalInformation.isBuyer ? 'X' : '');

        sheet.cell("C32").value(generalInformation.movedOut ? 'X' : '');
        sheet.cell("C33").value(!generalInformation.movedOut ? 'X' : '');

        sheet.cell("K29").value(generalInformation.reconstruction ? 'X' : '');
        sheet.cell("K30").value(!generalInformation.reconstruction ? 'X' : '');

        sheet.cell("K32").value(generalInformation.reconstructionByCurrentOwner ? 'X' : '');
        sheet.cell("C33").value(generalInformation.reconstructionByFormerOwner ? 'X' : '');

        generalInformation.approvals.forEach((approval, idx) => {
            this.updateApproval(sheet, 35 + idx, approval)
        });
        this.addRemarks(sheet, generalInformation.remarks);
    }

    addRemarks(sheet, remarks) {
        remarks.forEach((remark, idx) => {
            const rowNumber = 41 + idx;
            sheet.cell("A" + rowNumber).value(remark);
        });
    }

    updateApproval(sheet, rowNumber, approval) {

        if (approval.noRemark) {
            sheet.cell("E" + rowNumber).value('X');
        } else if (approval.shown) {
            sheet.cell("F" + rowNumber).value('X');
        } else if (approval.necessary) {
            sheet.cell("G" + rowNumber).value('X');
        } else if (approval.recommended) {
            sheet.cell("H" + rowNumber).value('X');
        }

        sheet.cell("I" + rowNumber).value(approval.remark);
    }

    addPresentPersons(sheet, persons) {
        sheet.cell("I9").value('Arkitekt Henrik Grube Mikkelsen');
        persons.filter(person => {
            return person.present;
        }).forEach((presentPerson, idx) => {
            let cellRow = 10 + idx;
            sheet.cell("I" + cellRow).value(presentPerson.name);
        });
    }

    formatDate(date) {
        return moment(date).format('DD.MM.YYYY');
    }
}

module.exports = GeneralInformationWriter; 