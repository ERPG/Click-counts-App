//     sttus
//     (c) simonfan
//     sttus is licensed under the MIT terms.

/**
 * Wrap files within an object
 * that easily grabs data about the file itself
 * that lies within comments.
 *
 * @module sttus
 */

'use strict';

/**
 * js-file is another module.
 * In sttus we are going to use 'dependencies'
 * and 'comments' functionalities from jsfile.
 *
 * Other methods, such as read, write, unlink are also available.
 * See https://github.com/simonfan/js-file for more information.
 *
 * @class jsfile
 * @constructor
 */
var jsfile = require('js-file');

var sttus = module.exports = jsfile.extend({
	reports: {
		status: {
			type: 'single',
			defaults: {
				etc: 0,
			}
		},

		todo: {
			type: 'list',
			defaults: {
				etc: 0
			}
		},

		etc: {
			type: 'method'
		},

		etcModule: {
			type: 'method'
		},

		all: {
			type: 'aggregate',
			reports: ['status', 'todo', 'etc', 'etcModule']
		}
	}
});

sttus.proto(require('./report'));
sttus.proto(require('./reducers/etc'));
