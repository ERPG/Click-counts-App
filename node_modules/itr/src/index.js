//     Iterator
//     (c) simonfan
//     Iterator is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Iterator
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) }	// jshint ignore:line

//>>excludeStart("exclude", pragmas.exclude);
var lalala = 'lalalalala';
//>>excludeEnd("exclude");

define(function (require, exports, module) {

	'use strict';

	var arrayIterator = require('./iterator/array'),
		objectIterator = require('./iterator/object'),
		_ = require('lodash');

	/**
	 * This function returns an instance of the correct iterator
	 * according to the type of the data object.
	 *
	 * @class iterator
	 */
	var iterator = function iterator(data) {
		var builder;

		if (_.isArray(data)) {

			builder = arrayIterator;

		} else if (_.isObject(data)) {

			builder = objectIterator;

		}

		return builder.apply(this, arguments);
	};

	iterator.object = objectIterator;
	iterator.array = arrayIterator;

	return iterator;
});
