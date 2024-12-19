const Redis = require('ioredis');
const { InternalServerError } = require('http-errors');

const { redisConfig } = require('../config/dotenv');

const { host, port, password } = redisConfig;
let client = null;

function init() {
  if (client) {
    return client;
  }

  client = new Redis({
    host,
    port,
    password,
  });
  client.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('Redis client connected');
  });
  client.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.log('Redis client error', err);
    process.exit(1);
  });
  return client;
}

/**
 * @param {string} key
 * @param {string} value
 * @param {number} EX
 */

function set(key, value, EX) {
  if (!client) throw new InternalServerError('redis_failure');
  return client.set(key, JSON.stringify(value), 'EX', EX);
}

/**
   * @param {string} key
   */
async function get(key) {
  if (!client) throw new InternalServerError('redis_failure');
  const value = await client.get(key);
  return JSON.parse(value);
}

/**
   * @param {string} key
   */
function del(key) {
  if (!client) throw new InternalServerError('redis_failure');
  return client.del(key);
}

init();

module.exports = {
  set,
  get,
  del,
};
