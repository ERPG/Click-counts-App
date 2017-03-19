require.config({
	urlArgs: 'bust=0.5270562747027725',
	baseUrl: '/',
	paths: {
		requirejs: 'bower_components/requirejs/require',
		text: 'bower_components/requirejs-text/text',
		mocha: 'node_modules/mocha/mocha',
		should: 'node_modules/should/should',
		mapo: 'src/mapo',
		jquery: 'bower_components/jquery/jquery',
		lodash: 'bower_components/lodash/dist/lodash.compat',
		'requirejs-text': 'bower_components/requirejs-text/text',
		underscore: 'bower_components/underscore/underscore'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
