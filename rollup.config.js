import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default {
    input: './index.js',
    external: ['react', 'react-dom' ],
    output: [
      {
          file: './build/cjs.js',
          format: 'cjs',
          name: 'bundle',
      },
      {
          file: './build/esm.js',
          format: 'esm',
      }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        resolve(),
        commonjs(),
        filesize(),
    ]
}
