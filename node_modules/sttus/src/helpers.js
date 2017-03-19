/**
 * Helpers.
 *
 * @module sttus
 * @submodule helpers
 */
'use strict';

var _ = require('lodash');

/**
 * Does the same as _.compact, but applied to objects.
 *
 * @method compactObject
 * @param obj {Object}
 */
exports.compactObject = function compactObject(obj) {
	_.each(obj, function (v, key) {
		if (_.isUndefined(v)) {
			delete obj[key];
		}
	});

	return obj;
};
