import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    // minify: !options.watch,
    format: ['esm', 'cjs'],
    entry: ['src/index.ts'],
    clean: true,
    dts: true,
    shims: true,
  };
});
