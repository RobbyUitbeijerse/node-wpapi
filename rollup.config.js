const babel = require( 'rollup-plugin-babel' );
const commonjs = require( 'rollup-plugin-commonjs' );
const external = require( 'rollup-plugin-peer-deps-external' );
const resolve  = require( 'rollup-plugin-node-resolve' );
const json = require( 'rollup-plugin-json' );
const pkg = require( './package.json' );
const { terser } =  require( 'rollup-plugin-terser' );

module.exports = [
	// CJS module
	{
		input: 'src/wpapi.js',
		output: {
			file: pkg.main,
			format: 'cjs',
			indent: false,
		},
		plugins: [
			external(),
			json(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			resolve( {
				preferBuiltins: true,
			} ),
			commonjs(),
		],
	},
	// ES module
	{
		input: 'src/wpapi.js',
		output: {
			file: pkg.module,
			format: 'es',
			indent: false,
		},
		plugins: [
			external(),
			json(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			resolve( {
				preferBuiltins: true,
			} ),
			commonjs(),
		],
	},
	// UMD (development)
	{
		input: 'src/wpapi.js',
		output: {
			file: 'dist/umd/wpapi.js',
			format: 'umd',
			indent: false,
		},
		plugins: [
			external(),
			json(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			resolve( {
				preferBuiltins: true,
				browser: true,
			} ),
		],
	},
	// UMD (production)
	{
		input: 'src/wpapi.js',
		output: {
			file: 'dist/umd/wpapi.min.js',
			format: 'umd',
			indent: false,
		},
		plugins: [
			external(),
			json(),
			babel( {
				exclude: 'node_modules/**',
			} ),
			resolve( {
				preferBuiltins: true,
				browser: true,
			} ),
			terser( {
				compress: {
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					warnings: false,
				},
			} ),
		],
	},
];
