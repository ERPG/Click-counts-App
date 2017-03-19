/*
 * status
 * 
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		status: {
			options: {

			//	node: true,
			//	bower: false,

			//  pkg: './demonode/package.json',
				base: './demonode/src',	
				main: './demonode/src/index',
			},
		}
	});


	grunt.loadTasks('../tasks');

	grunt.registerTask('default', 'status');
};
