import knex from 'knex';

const knexfile = require('../../knexfile');

const db = knex(knexfile);

export default db;
