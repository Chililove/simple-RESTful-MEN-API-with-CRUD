

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

    it('should verify that there is 0 art item in the database...', (done) => {
        chai.request(server).get('/api/arts').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.equal(0);
            done();
        });

    });

    it('should POST a valid art item...', (done) => {



        let art =
        {
            name: 'new art',
            description: 'this is art for testing',
            color: '',
            size: 38,
            price: 250,
            inStock: true


        };

        chai.request(server).post('/api/arts').send(art).end((err, res) => {
            res.should.have.status(201);

            done();
        });

    });

    it('should verify that there is 1 art item in the database...', (done) => {
        chai.request(server).get('/api/arts').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.equal(1);
            done();
        });

    });


    it('should test two values...', () => {

        let expectedValue = 10;
        let actualValue = 10;

        expect(actualValue).to.be.equal(expectedValue);
    })
})