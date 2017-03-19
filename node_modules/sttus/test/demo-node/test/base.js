'use strict';

var should = require('should');

var Demonode = require('.././src');

describe('Demonode base', function () {
	beforeEach(function (done) {
		done();
	});

	it('is fine (:', function () {
		var fruit = { name: 'banana' }
		fruit.should.have.property('name', 'banana');
	});
});
