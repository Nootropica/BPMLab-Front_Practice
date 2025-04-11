import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
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
