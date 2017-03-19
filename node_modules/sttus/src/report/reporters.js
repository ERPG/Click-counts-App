/**
 * Holds all report type runners.
 *
 * @module sttus
 * @submodule reporters
 */

'use strict';

var _ = require('lodash');

/**
 * Retrieves a single yaml block from the file.
 *
 * @method single
 * @param name {String}
 */
exports.single = function single(name) {

	var res = this.comments().yml(name),
		options = this.options(name);

	return _.isUndefined(options.defaults) ? res : _.extend({}, options.defaults, res);
};

/**
 * Retrieves a list of yaml objects from the file.
 *
 * @method list
 * @param name {String}
 */
exports.list = function list(name) {
	var res = this.comments().ymls(name),
		options = this.options(name);

	return _.map(res, function (r) {
		return _.isUndefined(options.defaults) ? r : _.extend({}, options.defaults, r);
	});
};

/**
 * Simply runs a method of this object and returns results.
 *
 * @method
 * @param name {String}
 */
exports.method = function method(name) {
	var args = Array.prototype.slice.call(arguments);
	args.shift();

	return this[name].apply(this, args);
};

/**
 * Returns an object with multiple reports within it.
 *
 * @method aggregate
 * @param name {String}
 */
exports.aggregate = function aggregate(name) {
	var res = {},
		options = this.options(name);

	_.each(options.reports, function (report) {
		res[report] = this.report(report);
	}.bind(this));

	return res;
};
