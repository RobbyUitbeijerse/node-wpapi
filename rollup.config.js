const babel = require( 'rollup-plugin-babel' );
const commonjs = require( 'rollup-plugin-commonjs' );
const external = require( 'rollup-plugin-peer-deps-external' );
const resolve = require( 'rollup-plugin-node-resolve' );
const pkg = require( './package.json' );

module.exports = [
	// CJS node
	{
		input: 'src/wpapi.js',
		output: {
			file: pkg.main,
			format: 'cjs',
			indent: false,
		},
		plugins: [
			resolve(),
			external(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			commonjs(),
		],
	},
	// ES modules
	{
		input: 'src/wpapi.js',
		output: {
			file: pkg.module,
			format: 'es',
			indent: false,
		},
		plugins: [
			resolve(),
			external(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			commonjs(),
		],
	},
	// UMD legacy browser
	{
		input: 'src/wpapi.js',
		output: {
			file: 'dist/umd/wpapi.js',
			format: 'umd',
			indent: false,
		},
		plugins: [
			resolve(),
			external(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			commonjs(),
		],
	},
];
