//Config to bundle all exported js files to one via rollup

import rollup      	from 'rollup';
import nodeResolve  from 'rollup-plugin-node-resolve';

export default {
  entry: 'build/ts_build/game.main.js',
  dest: 'build/dist/build.js', // output a single application bundle
  sourceMap: true,
  sourceMapFile: 'build/dist/build.js.map',
  format: 'iife',
  name: 'indiaca',
  plugins: [
    nodeResolve({ jsnext: true, module: true })
  ]
}