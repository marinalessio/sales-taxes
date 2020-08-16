const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Sales taxes API routes testing', function() {

    describe('GET /products', function() {
        it('Returns a list of products', function(done) {
            chai.request(app).get('/products')
                .end(function(err, res) {
                    if (err) done(err);
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe('POST /products', function() {
      it('Create new product', function(done) {
            chai.request(app).post('/products')
                .set('content-type', 'application/json')
                .send({ 
                    name: "test",
                    quantity: 1,
                    excepted: false,
                    imported: false,
                    price: 9.99
                })
                .end(function(err, res) {
                    if (err) done(err);
                    expect(res.status).to.equal(201);
                    done();
                });
        });
    });

    describe('POST /bill', function() {
        it('Create new bill', function(done) {
            chai.request(app).post('/bill')
                .set('content-type', 'application/json')
                .send("[11,12,13]")
                .end(function(err, res) {
                    if (err) done(err);
                    expect(res.status).to.equal(201);
                    done();
                });
        });
    });

});