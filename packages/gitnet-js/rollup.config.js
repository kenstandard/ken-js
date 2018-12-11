import babel from 'rollup-plugin-babel';
import toml from 'rollup-plugin-toml';

export default [
	{
		entry: 'src/main.js',
		plugins: [
			toml,
			babel({
				exclude: 'node_modules/**',
			})
		],
		output: {
			file: 'dist/main.js',
			format: 'cjs'
		}
	}
];