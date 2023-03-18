
process.env.NODE_ENV = 'test';

const chai = require('chai');
const { func } = require('joi');
const expect = chai.expect;


describe('/Test Collection Nr 1', function () {

    it('should test two values..', function () {
        let expectedValue = 10;
        let actualValue = 10;

        expect(actualValue).to.be.equal(expectedValue);
    })
})