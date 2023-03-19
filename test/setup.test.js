
process.env.NODE_ENV = 'test';

const Art = require('../models/art');
const User = require('../models/user');


before((done) => {
    Art.deleteMany({}, function (err) { });
    User.deleteMany({}, function (err) { });

    done();
});

after((done) => {
    Art.deleteMany({}, function (err) { });
    User.deleteMany({}, function (err) { });

    done();
});