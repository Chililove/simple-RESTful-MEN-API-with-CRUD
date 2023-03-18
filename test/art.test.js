
process.env.NODE_ENV = 'test';

const chai = require('chai');
const { func } = require('joi');
const expect = chai.expect;
const should = chai.should();
const chaitHttp = require('chai-http');
const server = require('../server');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe('/Test Collection Nr 1', () => {

    it('test default API welcome route...', (done) => {

        chai.request(server).get('/api/welcome').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object'); // another test
            //res.body.should.be.a('object');  // a test for if it is an array or not
            const actualValue = res.body.message;
            expect(actualValue).to.be.equal('Welcome to this api :)');
            console.log(res.body.message);
            done();

        })


    })



    it('should test two values...', () => {

        let expectedValue = 10;
        let actualValue = 10;

        expect(actualValue).to.be.equal(expectedValue);
    })
})