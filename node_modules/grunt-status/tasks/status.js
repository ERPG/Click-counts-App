/*
 * status
 * 
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

var sttus = require('sttus'),
	json = require('prettyjson');

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerTask('status', function () {

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({})

		console.log(options);

		var status = sttus(options.main);


		console.log(status.reportModule());

		console.log(json.render(status.reportModule('all')));
	});

};
