'use strict';

const Immutable = require('immutable');

const Constructor = Immutable.Record({
    name: null
});

class Record extends Constructor {}

module.exports.Constructor = Constructor;
module.exports.Record = Record;
