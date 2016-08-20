var should = require('should'),
    assert = require('assert'),
    request = require('supertest'),
    winston = require('winston'),
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
    getLevel: "?level=101",
    deleteLevel: {
        level: 101
    },
    putPlayer: {
        player: {
            id: "654321",
            name: "testName",
        }
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
                    if (err)
                        return done(err)
                    done();
                });
        });

        it('Gets a level', function(done) {
            request(url)
                .get("/level" + input.getLevel)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err)
                        return done(err)
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
                    if (err)
                        return done(err)
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
                    if (err)
                        return done(err)
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
                    if (err)
                        return done(err)
                    done();
                });
        });

        it('Gets a player', function(done) {
            request(url)
                .get("/player" + input.getPlayer)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err)
                        return done(err)
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
                    if (err)
                        return done(err)
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
                    if (err)
                        return done(err)
                    done();
                });
        });
    });
})
