const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  minify: true,
  outdir: 'dist',
  platform: 'node',
  sourcemap: true,
  target: 'node18',
  plugins: [nodeExternalsPlugin()],
}).catch(() => process.exit(1));
