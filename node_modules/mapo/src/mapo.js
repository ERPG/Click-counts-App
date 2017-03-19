//     Mapo
//     (c) simonfan
//     Mapo is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Mapo
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(["lodash"], function (_) {
	'use strict';

	var mapo = function mapo(object, mapper) {
		return _.reduce(object, function (result, value, key) {

			result[key] = mapper(value, key);

			return result;

		}, {});
	};

	return mapo;
});
