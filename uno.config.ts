import { defineConfig, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Inter',
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
      },
    }),
  ], // presets: [] -  disable default presets - includes preflight layer
  cli: {
    entry: {
      /**
       * Glob patterns to match files
       * Include HTML and inline templates in components.
       */
      patterns: ['src/**/*.html', 'src/**/*.ts'],
      /**
       * The output filename for the generated UnoCSS file
       */
      outFile: './src/uno.css',
    },
  },
});
