/**
 * base
 *
 *
 * @module iterator
 * @submodule base
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(['subject', 'lodash'], function (subject, _) {
	'use strict';

	/**
	 * Keeps reference to data object through a .data property,
	 * sets initial currentIndexition and saves options.
	 *
	 * @method initialize
	 * @param data {Array|Object}
	 * @param [options] {Object}
	 */
	var iterator = subject({
		initialize: function iterator(data, options) {
			this.data = data;

			options = options || {};

			this.currentIndex = options.startAt || -1;

			this.options = options;
			this.evaluate = options.evaluate || options.evaluator || this.evaluate;
		},

		move: function move(quantity) {
			this.index(this.currentIndex + quantity);
			return this;
		},

		/**
		 * The function that does the evaluation of the retrieved value/
		 */
		evaluate: function evaluate(v) { return v; },

		/**
		 * Simple setter for evaluate.
		 * @method evaluator
		 */
		evaluator: function evaluator(ev) {
			this.evaluate = ev;
			return this;
		},

		/**
		 * Place the currentIndex at the starting position,
		 * before all values.
		 * @method start
		 */
		start: function start() {
			this.currentIndex = -1;
			return this;
		},

		/**
		 * Place the currentIndex at the end positiion
		 * after all values.
		 * @method end
		 */
		end: function end() {
			this.currentIndex = this.length();
			return this;
		},

		/**
		 * Sets the current index and returns this.
		 * If given no argument, returns the current index.
		 *
		 * @method index
		 * @param [pos] {Number}
		 */
		index: function index(pos) {
			if (pos > this.length() - 1 || pos < 0) {
				throw new Error('No such index ' + pos);
			}

			this.currentIndex = pos;

			return this;
		},

		countBefore: function countBefore() {
			return this.currentIndex + 1;
		},

		countAfter: function countAfter() {
			return this.length() - (this.currentIndex + 1);
		},

		/**
		 * Equivalent to calling `iterator.at(pos)`
		 * for multiple indexs within a range.
		 *
		 * @method range
		 * @param from {Number}
		 * @param until {Number}
		 */
		range: function range(from, until) {
			var res = [];

			while (from <= until) {
				res.push(this.at(from));

				from ++;
			}

			return res;
		},

		hasNext: function hasNext() {
			return this.currentIndex < this.length() - 1;
		},

		/**
		 * Increments the counter and returns the next value.
		 *
		 * @method next
		 */
		next: function next() {
			this.move(1);

			return this.current();
		},

		/**
		 * Returns an array for the next n values
		 * and increments the counter in n.
		 *
		 * @method nextN
		 * @param quantity
		 */
		nextN: function nextN(quantity) {

			var res = [];

			// define an end
			var end = this.currentIndex + quantity - 1;

			while (this.hasNext() && this.currentIndex <= end) {
				res.push(this.next());
			}

			return res;
		},


		hasPrevious: function hasPrevious() {
			return this.currentIndex > 0;
		},

		/**
		 * Same as `next`, but backwards.
		 *
		 * @method previous
		 */
		previous: function previous() {
			this.move(-1);

			return this.current();
		},

		/**
		 * Same as `nextN` but backwards.
		 *
		 * @method previousN
		 * @param quantity
		 */
		previousN: function previousN(quantity) {
			var res = [];

			var start = this.currentIndex - quantity + 1;

			while (this.hasPrevious() && this.currentIndex >= start) {
				res.push(this.previous());
			}

			return res;
		},

		/**
		 * Returns the value of the current index.
		 *
		 * @method current
		 */
		current: function current() {
			return this.at(this.currentIndex);
		},

		/**
		 * Returns data object.
		 */
		value: function value() {
			return this.data;
		},
	});

	// aliases
	iterator.proto({
		hasPrev: iterator.prototype.hasPrevious,
		prev: iterator.prototype.previous,
		prevN: iterator.prototype.previousN,
	});

	// chainable methods
	var chainable = ['map', 'filter', 'compact', 'difference'];

	/**
	 *
	 * From lodash's documentation:
	 *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
     * and `zip`
     */

	_.each(chainable, function (method) {
		iterator.proto(method, function () {
			// this function will be called within the
			// iterator's context.
			var data = _(this.data);

			data = data[method].apply(data, arguments);

			var iter = this.constructor(data.value());
			return iter;
		});
	});

	return iterator;
});
