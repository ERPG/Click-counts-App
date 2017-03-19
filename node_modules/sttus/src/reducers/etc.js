/**
 * Logic for Estimated Time for Completion (ETC/etc)
 *
 * @module sttus
 * @submodule etc
 */
'use strict';

var _ = require('lodash');

/**
 * Calculates the estimated time of completion
 * for the current file.
 * Calculations based on 'status' and 'to-do's.
 *
 * @method etc
 */
exports.etc = function etc() {

	var statusEtc = this.report('status').etc,
		todos = this.report('todo'),
		todosEtc = _.reduce(todos, function (res, todo) {
			return todo.etc ? res + todo.etc : res;
		}, 0);

	return todosEtc >= statusEtc ? todosEtc : statusEtc;
};

/**
 * Returns the total etc, summing up the dependencies etc.
 *
 * @method etcModule
 */
exports.etcModule = function etcModule() {

	var thisEtc = this.etc();

	var dependencies = this.dependencies({
		depth: true,
		base: void(0),
		origin: 'internal'
	}).files();

	var etcMod = _.reduce(dependencies, function (res, file, path) {

		return res + file.etc();

	}, thisEtc);

	return etcMod;
};
