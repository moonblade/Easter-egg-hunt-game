var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    winston = require('winston'),
    should = require('should'),
    expect = require('expect'),
    debug = require('debug')('test'),
    constant = require('../config/constant'),
    md5 = require('md5'),
    config = require('../config');

var level = 0;
input = {
    "putLevel": [{
        "level": {
            "level": 0,
            "key": "ignition",
            "basescore": 0
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 1,
            "key": "wargames",
            "basescore": 5000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 2,
            "key": "theonlywinningmoveisnottoplay",
            "basescore": 100000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 3,
            "key": "narvi",
            "basescore": 20000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 4,
            "key": "mellogoth",
            "basescore": 200000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 5,
            "key": "three",
            "basescore": 30000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 6,
            "key": "minusworld",
            "basescore": 30000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 7,
            "key": "olivertwist",
            "basescore": 30000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 8,
            "key": "readyplayerone",
            "basescore": 30000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 9,
            "key": "gregariousgames",
            "basescore": 300000
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 10,
            "key": "iwantmore",
            "basescore": 0
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }, {
        "level": {
            "level": 11,
            "key": "garblegarblegarble",
            "basescore": 0
        },
        "user": {
            "id": "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }]
}

describe('Routing', function() {
    var url = config.serverUrl;
    it('Put level ' + input.putLevel[0].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[0])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[1].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[1])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[2].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[2])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[3].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[3])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[4].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[4])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[5].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[5])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[6].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[6])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[7].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[7])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

    it('Put level ' + input.putLevel[8].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[8])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });
    
    it('Put level ' + input.putLevel[9].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[9])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });
    
    it('Put level ' + input.putLevel[10].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[10])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });
    
    it('Put level ' + input.putLevel[11].level.level, function(done) {
        request(url)
            .put("/level")
            .send(input.putLevel[11])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql(constant.codes.successMessage);
                done();
            });
    });

})
