import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [
  // Browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'HoverOn',
      file: 'dist/hover-on.umd.js',
      format: 'umd',
      sourcemap: true,
      globals: {}
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        modules: false,
        use: ['sass'],
      }),
      production && terser()
    ]
  },
  
  // ES module build
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        modules: false,
      }),
      production && terser()
    ]
  },
  
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: false,
        modules: false,
      }),
      production && terser()
    ]
  }
];
