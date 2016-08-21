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

input = {
    putLevel: {
        level: {
            level: 101,
            key: "testKey",
            basescore: 5000
        },
        user: {
            id: "791a4270d908c5d131e59f4ee95b9f4a"
        }
    },
    getLevel: {
        level: {
            level: 101,
        },
        user: {
            id: "791a4270d908c5d131e59f4ee95b9f4a"
        }
    },
    deleteLevel: {
        level: {
            level: 101,
        },
        user: {
            id: "791a4270d908c5d131e59f4ee95b9f4a"
        }
    },
    putPlayer: {
        player: {
            id: "654321",
            name: "testName",
            level:101
        }
    },
    checkAnswer: {
        player: {
            id: "654321"
        },
        answer: "testKey"
    },
    putPlayerNameConflict: {
        player: {
            id: "654322",
            name: "testName"
        }
    },
    getPlayer: "?id=654321",
    deletePlayer: {
        player: {
            id: "654321",
        },
        user: {
            id: "791a4270d908c5d131e59f4ee95b9f4a"
        }
    }
}

describe('Routing', function() {
    var url = config.serverUrl;
    describe('Level Functions', function() {
        it('Puts a level', function(done) {
            request(url)
                .put("/level")
                .send(input.putLevel)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.eql(constant.codes.successMessage);
                    done();
                });
        });

        it('Gets a level', function(done) {
            request(url)
                .post("/level")
                .send(input.getLevel)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('_id');
                    done();
                });
        });
    });

    describe('Player Functions', function() {
        it('Puts a player', function(done) {
            request(url)
                .put("/player")
                .send(input.putPlayer)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.eql(constant.codes.successMessage);
                    done();
                });
        });


        it('Conflict on id of player', function(done) {
            request(url)
                .put("/player")
                .send(input.putPlayer)
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('Conflict on name of player', function(done) {
            request(url)
                .put("/player")
                .send(input.putPlayerNameConflict)
                .expect('Content-Type', /json/)
                .expect(500)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('Checks if answer is correct', function(done) {
            request(url)
                .post("/player/checkAnswer")
                .send(input.checkAnswer)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.eql(constant.codes.correctAnswer);
                    done();
                });
        });

        it('Gets a player', function(done) {
            request(url)
                .get("/player" + input.getPlayer)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('_id');
                    // checks if passed correct answer by checking level and score
                    res.body.should.have.property('level');
                    res.body.level.should.eql(102);
                    res.body.should.have.property('score');
                    res.body.score.should.not.eql(0);
                    done();
                });
        });

        it('Gets scoreBoard', function(done) {
            request(url)
                .get("/scoreboard")
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.have.property('scoreBoard');
                    res.body.scoreBoard.length.should.be.above(9);
                    done();
                });
        });

        it('Deletes a player', function(done) {
            request(url)
                .delete("/player")
                .send(input.deletePlayer)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.eql(constant.codes.successMessage);
                    done();
                });
        });
    });

    describe('Level Functions', function() {
        it('Deletes a level', function(done) {
            request(url)
                .delete("/level")
                .send(input.deleteLevel)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.eql(constant.codes.successMessage);
                    done();
                });
        });
    });
})
