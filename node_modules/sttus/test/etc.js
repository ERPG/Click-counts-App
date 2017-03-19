'use strict';

var path = require('path')

var should = require('should');

var status = require('.././src');

describe('etc report', function () {
	beforeEach(function () {
		this.status = status(path.join(__dirname, 'demo-node/src/index'));
	});

	it('etc()', function () {
		var etc = this.status.etc();

		etc.should.eql(10);
	});

	it('etcModule()', function () {
		var etc = this.status.etcModule();

		etc.should.eql(75);
	});

	it('report(\'etc\')', function () {
		var etc = this.status.report('etc');

		etc.should.eql(10);
	});

	it('report(\'etcModule\')', function () {
		var etc = this.status.report('etcModule');

		etc.should.eql(75);
	});

	it('reportModule(\'etc\')', function () {
		var etcs = this.status.reportModule('etc');

		etcs.should.eql({
			'sub.js': 40,
			'sub2/index.js': 25,
			'sub2/sub2sub.js': 0,
			'index.js': 10
		});
	});

	it('reportModule(\'etcModule\')', function () {
		var etcs = this.status.reportModule('etcModule');

		etcs.should.eql({
			'sub.js': 40,
			'sub2/index.js': 25,
			'sub2/sub2sub.js': 0,
			'index.js': 75
		});
	});
});
