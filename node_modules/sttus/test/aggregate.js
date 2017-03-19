'use strict';

var path = require('path')

var should = require('should');

var status = require('.././src');

describe('aggregate report', function () {
	beforeEach(function () {
		this.status = status(path.join(__dirname, 'demo-node/src/index'));
	});


	it('provides a report that has many reports within', function () {

		var aggr = this.status.report('all');

	//	console.log(aggr);

	})
});
