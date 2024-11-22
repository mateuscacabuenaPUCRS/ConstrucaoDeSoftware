const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  external: [
    '@nestjs/websockets/socket-module',
    '@nestjs/microservices/microservices-module',
    '@nestjs/microservices',
    'class-transformer',
    'class-validator'
  ],
  outfile: 'dist/index.js',
}).catch(() => process.exit(1));