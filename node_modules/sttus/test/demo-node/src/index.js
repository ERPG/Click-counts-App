//     Demonode
//     (c)
//     Demonode is licensed under the MIT terms.

/**
 * CJS module.
 *
 * @module Demonode
 */

/**
 * >>status
 * etc: 10
 */

'use strict';

console.log('demonode running');


var Lodash = require('lodash');


var sub = require('./sub'),
	sub2 = require('./sub2');

exports.demonode = function demonode() {
	return 'awesome!';
};
