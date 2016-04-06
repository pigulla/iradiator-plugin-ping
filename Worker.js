'use strict';

const ping = require('ping');
const Promise = require('bluebird');

class PingWorker {
    constructor(config, logger) {
        this._config = config;
        this._logger = logger;
    }

    run(previousData) {
        this._logger.trace('Checking if target is alive');

        return Promise
            .resolve(ping.promise.probe(this._config.host))
            .timeout(this._config.timeout)
            .bind(this)
            .catch(function () {
                return { alive: false, host: null, output: null };
            })
            .then(function ({ alive, host, output }) {
                if (!previousData || previousData.alive !== alive) {
                    return { alive };
                }
            })
    }
}

module.exports = PingWorker;
