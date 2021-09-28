const debug = require('debug')('app:database');
const { MongoClient: objectId, MongoClient } = require('mongodb');
const config = require('config');

let _db = null;

/** Connect to the database. */
async function connect() {
  if (!_db) {
    const dbUrl = config.get('db.url');
    const dbName = config.get('db.name');
    const client = await MongoClient.connect(dbUrl);
    _db = client.db(dbName);
  }
  return _db;
}

async function ping() {
  const db = await connect();
  await db.command({ ping: 1 });
  debug('Ping');
}

async function findAllPets() {
  const db = await connect();
  return db.collection('pets').find({}).toArray();
}

ping();

module.exports = {
  connect,
  ping,
  findAllPets
};