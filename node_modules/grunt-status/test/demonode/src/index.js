//     Demonode
//     (c) simonfan
//     Demonode is licensed under the MIT terms.

/**
 * CJS module.
 *
 * @module Demonode
 */

'use strict';

console.log('demonode running');


var Lodash = require('lodash');

var FileObject = require('file-object');

var sub = require('./sub'),
	sub2 = require('./sub2');

exports.demonode = function demonode() {
	return 'awesome!';
};
