/**
 * base
 *
 *
 * @module iterator
 * @submodule base
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) } // jshint ignore:line

define(function (require, exports, module) {
	'use strict';

	var iterator = require('./base'),
		_ = require('lodash');

	/**
	 * Has a custom initialization and a custom .at method.
	 *
	 * @class objectIt
	 */
	var objectIt = iterator.extend({
		initialize: function objectIterator(data, options) {
			options = options || {};

			iterator.prototype.initialize.apply(this, arguments);

			this.order = options.order || _.keys(data);
		},

		/**
		 * Returns the key at a given position.
		 *
		 * @method keyAt
		 * @param pos
		 */
		keyAt: function keyAt(pos) {
			return this.order[pos];
		},

		at: function at(pos) {
			var key = this.keyAt(pos),
				value = this.data[key];

			return this.evaluate(value, key);
		},

		length: function length() {
			return this.order.length;
		},

		/**
		 * Returns the key of the next value in line.
		 * Does NOT move the `currentIndex`.
		 *
		 * @method nextKey
		 */
		nextKey: function nextKey() {
			return this.keyAt(this.currentIndex + 1);
		},

		currentKey: function currentKey() {
			return this.keyAt(this.currentIndex);
		},

		previousKey: function previousKey() {
			return this.keyAt(this.currentIndex - 1);
		},

		/**
		 * Transformations
		 */

		/**
		 * Overwrite the default map transformation method.
		 * @method map
		 */
		map: function (mapper) {
			var obj = {};

			_.each(this.order, function (key, index) {
				obj[key] = mapper(this.data[key], key, index);
			}.bind(this));

			return this.constructor(obj);
		},
	});

	objectIt.proto('constructor', objectIt);

	return objectIt;
});
