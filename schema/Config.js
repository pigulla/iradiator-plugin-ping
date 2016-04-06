'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    host: Joi.string().ip(),
    timeout: Joi.number().integer()
});
