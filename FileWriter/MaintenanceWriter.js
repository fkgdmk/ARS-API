
class MainenanceWriter {

    addDetailsToSheet(sheet, maintenanceAreas) {
        const {general, hall, kitchen, bathroom, livingroom} = maintenanceAreas;
        
        this.updateMaintenanceArea(general, 5, sheet)
        this.updateMaintenanceArea(hall, 13, sheet)
        this.updateMaintenanceArea(kitchen, 18, sheet)
        this.updateMaintenanceArea(bathroom, 30, sheet)
        this.updateMaintenanceArea(livingroom, 41, sheet)
    }

    updateMaintenanceArea(area, startRow, sheet) {
        area.forEach((subject, idx) => {
            const row = startRow + idx;
            this.insertValues(subject, row, sheet);
        });
    }

    insertValues (maintenanceArea, row, sheet) {
        const { condition, payedBy, sellersAmount, remark } = maintenanceArea;
        //Condition
        sheet.cell("D" + row).value(condition.approved ? 'X' : '');
        sheet.cell("E" + row).value(condition.defective ? 'X' : '');
        sheet.cell("F" + row).value(condition.bad ? 'X' : '');
        //Payed by
        sheet.cell("G" + row).value(payedBy.seller ? 'X' : '');
        sheet.cell("H" + row).value(payedBy.ab ? 'X' : '');
        //Sellers amount
        sheet.cell("I" + row).value(sellersAmount.detained);
        sheet.cell("J" + row).value(sellersAmount.deduction);
        //Remark
        sheet.cell("K" + row).value(remark);
    }

}

module.exports = MainenanceWriter;