// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../index';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Report = require('../db/Report')
const dummyReport = require('../utilities/dummyReport.json')
chai.use(chaiHttp);
chai.should();

describe("Report", () => {
    const report = new Report(dummyReport)
    let reportId = "";
    it("should create report", (done) => {
        chai
            .request(app)
            .post('/report')
            .set('content-type', 'application/json')
            .set('accept', 'application/json')
            .send(report)
            .end((err, res) => {
                res.should.have.status(200);
                reportId = res.body.id;
                done();
            });
    })

    it("should return one report", (done) => {
        chai.request(app)
            .get('/report?id=' + reportId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    })

    it("should delete report", (done) => {
        chai.request(app)
            .delete('/report?id=' + reportId)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });    
        })
})

describe("Union", () => {
    it('should return all unions', (done) => {
        chai.request(app)
            .get('/unions')
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(res.body.length).to.be.above(0) // Recommended
                done();
            });
    });
});

describe('Impairement values', () => {
    it('should return hourly salary for 2016', (done) => {
        chai.request(app)
            .get('/getImpairmentValues?year=2016')
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(res.body.hourlySalary).to.equal(197)
                done();
            });
    });

    it('should return impairment percentage for 2016 and impairment curve 30', (done) => {
        chai.request(app)
            .get('/getImpairmentValues?year=2016&impairmentCurve=30')
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(res.body.impairmentPercentage).to.equal(96)
                done();
            });
    });
})
