import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rename-css-to-app',
      generateBundle(options, bundle) {
        for (const [fileName, assetInfo] of Object.entries(bundle)) {
          if (
            assetInfo.type === 'asset' &&
            fileName.endsWith('.css')
          ) {
            delete bundle[fileName];
            bundle['app.css'] = {
              ...assetInfo,
              fileName: 'app.css',
            };
            break;
          }
        }
      },
    },
  ],
  build: {
    outDir: '../assets/js/admin',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'src/index.jsx'),
      },
      output: {
        entryFileNames: 'app.js',
      },
    },
  },
});
