const knexfile = require('../../knexfile');
const knex = require('knex');
const db = knex(knexfile);

module.exports = db;