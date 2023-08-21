'use strict';

const qiankunPlugin = require('..');
const assert = require('assert').strict;

assert.strictEqual(qiankunPlugin(), 'Hello from qiankunPlugin');
console.info('qiankunPlugin tests passed');
