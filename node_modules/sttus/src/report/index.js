/**
 * Logic for invoking reporters.
 *
 * @module sttus
 * @submodule report
 */

'use strict';

var path = require('path');

var _ = require('lodash'),
	mapo = require('mapo');

var h = require('../helpers'),
	reporters = require('./reporters');

/**
 * Takes a report name and invokes the correct reporter.
 *
 * @method report
 * @param name {String}
 */
exports.report = function report(name) {

		// name defaults to status
	name = name || 'status';

		// retrieve report object
	var options = this.options(name);

	return reporters[options.type].apply(this, arguments);
};

/**
 * Returns an object keyed by filepath
 * and valued by respective reports.
 *
 * @method reportModule
 * @param name {String}
 */
exports.reportModule = function reportModule(name) {
		// retrieve dependencies object
	var deps = this.dependencies({
			origin: 'internal',
			depth: true,
			base: path.dirname(this.path)
		}),

		// retrieve reports from dependencies
		reports = deps.invoke('report', name);

	// retrieve own report
	reports[path.basename(this.path)] = this.report(name);

	return h.compactObject(reports);
};

/**
 * Basically retrieves the options for a given report name.
 * Might be useful to set defaults here.
 *
 * @method options
 * @param name {String}
 */
exports.options = function options(name) {
	return this.reports[name] || {};
}
