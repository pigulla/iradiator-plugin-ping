'use strict';

const ping = require('net-ping');
const Promise = require('bluebird');

class PingWorker {
    constructor(config, logger) {
        this._config = config;
        this._logger = logger;

        this._session = ping.createSession({ timeout: this._config.timeout });
    }

    run(previousData) {
        this._logger.trace('Checking if target is alive');

        return Promise
            .fromCallback(cb => this._session.pingHost(this._config.host, cb), { multiArgs: true })
            .bind(this)
            .return(true)
            .catch(function (error) {
                this._logger.trace(`Host "${this._config.host}" is dead (reason: ${error.name})`);
                return false;
            })
            .then(function (alive) {
                if (!previousData || previousData.alive !== alive) {
                    return { alive };
                }
            })
    }
}

module.exports = PingWorker;
