(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'../src/mapo' :
		// browser
		'mapo',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(mapo, should) {
	'use strict';

	describe('mapo(object, function)', function () {
		beforeEach(function () {
			this.source = {
				first: 1,
				second: 2
			};
		});

		it('returns a not-array-object', function () {

			var res = mapo(this.source, function (value, key, result) {

				// may either return a value
				return value + 10;

				// or set a property on the result
				// result[key] = value + 10;

			});

			res.should.eql({
				first: 11,
				second: 12
			});

		});
	});
});
