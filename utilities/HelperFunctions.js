const moment = require('moment');

const createReportName = (generalInformation) => {
    return generalInformation.address + '-' + formatDate(generalInformation.reviewDate) + '.xlsx';
}

const formatDate = (date) => {
    return moment(date).format('DD.MM.YYYY');
}

module.exports = formatDate;
module.exports = createReportName;