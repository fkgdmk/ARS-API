class ImprovementsWriter {

    addDetailsToSheet (sheet, improvements) {

        this.addImprovements(improvements.general, 5, sheet);
        this.addImprovements(improvements.kitchen, 10, sheet);
        this.addImprovements(improvements.bathroom, 20, sheet);
        this.addImprovements(improvements.hall, 29, sheet);
        this.addImprovements(improvements.livingroom, 34, sheet);
    }

    addImprovements (area, startRow, sheet) {
        area.forEach((improvement, idx) => {
            const row = startRow + idx;
            this.insertValues(improvement, row, sheet);
        });
    }

    insertValues (improvement, row, sheet) {
        const { subject, purchased, documentation, impairmentCurve, extent, age, improvementType } = improvement;
        sheet.cell("B" + row).value(subject);
        sheet.cell("C" + row).value(purchased.year - 2000);
        sheet.cell("D" + row).value(improvementType.calculatedValue);

        sheet.cell("E" + row).value(this.createDocumentationValue(documentation));

        sheet.cell("F" + row).value(extent);
        sheet.cell("G" + row).value(age);
        sheet.cell("H" + row).value(parseInt(impairmentCurve));
        sheet.cell("I" + row).value(improvementType.impairmentPercentage);
        sheet.cell("J" + row).value(documentation.ownWork ? 'ja' : 'nej');
        sheet.cell("K" + row).value(improvementType.hours);
        sheet.cell("L" + row).value(improvementType.hourPrice);
    }

    createDocumentationValue (documentation){
        if (documentation.invoice) {
            return 'ja';
        } else if (documentation.takenOver) {
            return 'overtaget';
        }
        return 'nej';
    }
}

module.exports = ImprovementsWriter;