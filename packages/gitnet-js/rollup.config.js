import babel from 'rollup-plugin-babel';
import toml from 'rollup-plugin-toml';

export default [
	{
		external: ["lodash"],
		entry: 'src/main.js',
		plugins: [
			toml,
			babel({
				exclude: 'node_modules/**',
			})
		],
		external: ["lodash", "ramda"],
		output: {
			file: 'dist/main.js',
			format: 'cjs'
		}
	}
];