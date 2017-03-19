(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'../src/index' :
		// browser
		'itr',
		// dependencies for the test
		deps = [mod, 'should', 'lodash'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(iterator, should, _) {
	'use strict';


	/**
	 * Tests are repeated for iterator(Object) and iterator(Array).
	 * Both iterator objects should have the same interface,
	 * thus we separate tests.
	 */
	var basics = {
		'is an object': function () {
			this.iter.should.be.type('object');
		},

		'stores the data object on a data property': function () {
			this.iter.data.should.eql(this.data);
		},
	};

	function runBasicTests() {
		_.each(basics, function (test, name) {
			it(name, test);
		});
	}









	/**
	 * Counter methods
	 */
	var counters = {
		'it.length()': function () {
			it('returns the length of the object', function () {
				this.iter.length().should.be.exactly(this.values.length);
			})
		},

		'it.countAfter()': function () {

			it('returns quantity of items after current', function () {

				var iter = this.iter;

				iter.countAfter().should.eql(this.values.length);

				iter.next();
				iter.next();

				iter.countAfter().should.eql(iter.length() - 2);
			})

		},

		'it.countBefore()': function () {
			it('returns quantity of items before current', function () {

				var iter = this.iter;

				iter.countBefore().should.eql(0);

				iter.next();

				iter.next();
				iter.next();

				iter.countBefore().should.eql(3);

				iter.prev();
				iter.countBefore().should.eql(2);
			})
		},
	};


	/**
	 * index position methods.
	 */
	var index = {
		'it.index(Number)': function () {
			it('sets the current index of the iterator if the argument is a Number', function () {
				var iter = this.iter;

				iter.index(2);

				iter.next().should.eql(this.values[3]);
			});
		},
		'it.move(Number)': function () {
			it('moves the current index', function () {
				var iter = this.iter;

				iter.currentIndex.should.eql(-1);
				iter.move(3);

				iter.currentIndex.should.eql(2);
				iter.current().should.eql(this.values[2]);


				iter.move(-2).current().should.eql(this.values[0]);
				iter.currentIndex.should.eql(0);
			})
		},
		'it.at(Number)': function () {
			it('returns the value at the required index', function () {
				var iter = this.iter;

				var third = iter.at(2);

				third.should.eql(this.values[2]);
			});

			it('evaluates the value before returning', function () {
				var iter = this.iter;


				// set the evaluator
				iter.evaluator(function (value, key) {
					return value + '-lalala';
				});

				var first = iter.at(0);

				first.should.eql(iter.evaluate(this.values[0]));
			});
		},
	}

	/**
	 * Iterator walking mehtod.s
	 */
	var walkers = {
		'it.next()': function () {
			it('returns the next item', function () {
				var iter = this.iter,
					values = this.values;

				var first = iter.next(),
					second = iter.next(),
					third = iter.next();

				first.should.eql(values[0]);
				second.should.eql(values[1]);
				third.should.eql(values[2]);
			});

			it('throws Error when out of values', function () {
				var iter = this.iter,
					error = false;

				// the default stop method returns undefined.
				iter.index(iter.length() - 1);

				try {
					iter.next();
				} catch (err) {

					error = true;

				}

				error.should.be.ok;
			})
		},

		'it.nextN(Number)': function () {
			it('returns an array of the next values', function () {
				var iter = this.iter,
					values = this.values;

				var firstTwo = iter.nextN(2),
					lastTwo = iter.nextN(3);

				firstTwo.should.eql([this.values[0], this.values[1]]);
				lastTwo.should.eql([this.values[2], this.values[3], this.values[4]]);
			});

		},

		'it.hasNext()': function () {
			it('returns true while the iterator has not reached its limit', function () {
				var iter = this.iter,
					count = 0;

				iter.hasNext().should.be.true;

				iter.next();

				iter.hasNext().should.be.true;

				while(iter.currentIndex < iter.length() - 1) {
					iter.hasNext().should.be.true;
					iter.next();
				}
				iter.hasNext().should.be.false;
			})
		},

		'it.previous() / it.prev()': function () {

			it('returns the previous item evaluated by the function', function () {
				var iter = this.iter,
					values = this.values;

				iter.index(4);

				var fourth = iter.prev(),
					third = iter.previous(),
					second = iter.previous(),
					first = iter.previous();

				fourth.should.eql(values[3]);
				third.should.eql(values[2]);
				second.should.eql(values[1]);
				first.should.eql(values[0]);
			});

			it('throws an error when out of values', function () {
				var iter = this.iter,
					error = false;

				// put iter at start position
				iter.start();

				try {
					iter.prev()
				} catch (e) {
					error = true;
				}

				error.should.be.ok;
			})
		},

		'it.previousN(Number) / it.prevN(Number)': function () {
			it('returns an array of previous n values', function () {
				var iter = this.iter,
					values = this.values;

				iter.end();

				var lastTwo = iter.prevN(2);

				lastTwo.should.eql([values[values.length - 1], values[values.length - 2]])

			})
		},

		'it.hasPrevious() / it.hasPrev()': function () {
			it('returns true while there are values before the current one', function () {
				var iter = this.iter;

				iter.currentIndex.should.eql(-1);
				iter.hasPrev().should.be.false;

				iter.next().should.be.eql(this.values[0]);

				iter.currentIndex.should.eql(0);
				iter.hasPrevious().should.be.false;

				iter.next();

				iter.currentIndex.should.eql(1);
				iter.hasPrevious().should.be.true;

				iter.next();
				iter.next();

				iter.currentIndex.should.eql(3);

				iter.hasPrevious().should.be.true;
			})
		},
	};


	/**
	 * Transformations
	 */
	var transformations = {
		'it.map(Function)': function () {

			it('returns another iterator wrapping the transformed values', function () {

				var iter = this.iter,
					mapper = function (value, key) {
						return value + '-lalala';
					};

				var iter2 = iter.map(mapper);
				while (iter2.hasNext()) {
					iter2.next().should.eql(mapper(iter.next()));
				}
			});
		},

		'it.filter(Function)': function () {
			it('returns another iterator wrapping the filtered values', function () {
				var iter = this.iter,
					answers = iterator([true, false, true, false, true, false, true]),
					filter = answers.next.bind(answers);

				var iter2 = iter.filter(filter);
				iter2.length().should.eql(3);
			})
		}
	};














	function runTests(block, tests) {

		describe(block, function () {
			_.each(tests, function (test, name) {
				describe(name, test);
			});
		})
	}



	/**
	 * Run tests on Array iterator
	 */
	describe('it = iterator(Array)', function () {
		beforeEach(function () {
			this.values = this.data = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

			this.iter = iterator(this.values);
		});

		runBasicTests();
		runTests('counters', counters);
		runTests('indexers', index);
		runTests('walkers', walkers);
		runTests('transformations', transformations);

		/**
		 * Array iterator's specific mehtods.
		 */
		describe('Array native methods', function () {

			describe('direct alterations on the iterator\'s data object', function () {

				it('it.push(*)', function () {
					this.iter.push('last');

					this.iter.end().prev().should.eql('last');
				});
			})

			describe('instantiation of new iterators', function () {

				it('it.concat(Array, Array, ...)', function () {
					var additional = ['lalala', 'lalalaaaa', 'lelele'],
						iter2 = this.iter.concat(additional);

					iter2.data.should.eql(this.iter.data.concat(additional));
				});
			})
		})

	});


	/**
	 * Run tests on Object iterator
	 */
	describe('it = iterator(Object)', function () {
		beforeEach(function () {
			this.keys = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
			this.values = [1, 2, 3, 4, 5, 6];

			this.data = _.zipObject(this.keys, this.values);

			this.iter = iterator(this.data);
		});

		runBasicTests();
		runTests('counters', counters);
		runTests('indexers', index);
		runTests('walkers', walkers);
		runTests('transformations', transformations);


		/**
		 * Object iterator specific stuff.
		 */

		describe('it = iterator(Object, { order: Array })', function () {

			beforeEach(function () {
				this.naturalOrder = iterator({
					first: 1,
					second: 2,
					third: 3
				});

				this.artificialOrder = iterator({
					first: 1,
					second: 2,
					third: 3
				}, {
					order: ['third', 'first', 'second']
				});
			});

			it('returns an iterator ordered by the order array instead of the default object order', function () {
				var naturalOrder = this.naturalOrder;

				naturalOrder.next().should.eql(1);
				naturalOrder.next().should.eql(2);
				naturalOrder.next().should.eql(3);

				var artificialOrder = this.artificialOrder;

				artificialOrder.next().should.eql(3);
				artificialOrder.next().should.eql(1);
				artificialOrder.next().should.eql(2);
			});

			it('key = it.keyAt(pos)', function () {
				var it = this.artificialOrder;

				it.keyAt(2).should.eql('second');
			});

			it('key = it.nextKey()', function () {
				var it = this.artificialOrder;

				it.nextKey().should.eql('third')
			});
		});
	});

	describe('it = iterator(Array|Object, { evaluator: Function })', function () {
		it('Object : returns an iterator that uses the default eval function', function () {
			var iter = iterator({
				first: 1,
				second: 2,
				third: 3
			}, {
				evaluator: function (value, key) { return value + '-lalala-' + key; },
			});

			iter.next().should.eql('1-lalala-first');
			iter.next().should.eql('2-lalala-second');
		});
	});

});
