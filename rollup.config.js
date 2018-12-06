// rollup.config.js
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'source/tmp/bundle.js',
    output: {
        file: 'build/js/bundle.js',
        format: 'iife'
    },
    watch: {
        clearScreen: false
    },
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};