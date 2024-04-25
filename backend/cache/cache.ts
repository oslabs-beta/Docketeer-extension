// Switched from Redis to Memcached as Redis is no longer free.
// Chose Memcached since a well maintained docker image exists
// memcached requires import, then connection via new Memcached
// see https://www.npmjs.com/package/memcached for methods
// see https://hub.docker.com/_/memcached for memcached docker image

const Memcached = require('memcached');

const memcachedClient: any = new Memcached('memcached:11211', { retries: 1, retry: 5000 });

export default memcachedClient;

