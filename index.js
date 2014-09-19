'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var Hub = require('puddle-hub');

module.exports = function (file) {
    assert.equal(path.extname(file), '.json');
    var corpus = JSON.parse(fs.readFileSync(file));
    var hub = new Hub(corpus);
    var dumpCorpus = function () {
        fs.writeFileSync(
            file,
            JSON.stringify(hub.getState(), undefined, 4)
        );
    };
    hub.on('create', dumpCorpus);
    hub.on('remove', dumpCorpus);
    hub.on('update', dumpCorpus);
    return hub;
};