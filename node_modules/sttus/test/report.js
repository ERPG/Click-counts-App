'use strict';

var path = require('path')

var should = require('should');

var status = require('.././src');

describe('status report', function () {
	beforeEach(function () {
		this.status = status(path.join(__dirname, 'demo-node/src/index'));
	});

	it('report(name)', function () {
		var r = this.status.report('status');

		r.should.eql({
			etc: 10
		})
	});

	it('report(name), apply defaults', function () {

	})

	it('reportModule(name)', function () {
		var rm = this.status.reportModule('status');

		rm.should.eql({
			'sub.js': {
				etc: 40
			},
			'index.js': {
				etc: 10
			},
			'sub2/index.js': {
				etc: 0
			},
			'sub2/sub2sub.js': {
				etc: 0
			}
		})
	});

	it('report(\'todo\')', function () {
		var r = this.status.report('todo');

		r.should.eql([])
	});

	it('reportModule(\'todo\')', function () {
		var rm = this.status.reportModule('todo');

		rm.should.eql({
			'index.js': [],
			'sub.js': [],
			'sub2/index.js': [
				{
					name: 'Plan API',
					etc: 20
				},
				{
					name: 'Study third-party modules.',
					etc: 5
				}
			],
			'sub2/sub2sub.js': []
		})
	});
});
