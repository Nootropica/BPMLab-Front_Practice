import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		react(),
		svgr(),

		{
			name: 'rename-css-to-app',
			generateBundle(options, bundle) {
				for (const [fileName, assetInfo] of Object.entries(bundle)) {
					if (assetInfo.type === 'asset' && fileName.endsWith('.css')) {
						delete bundle[fileName];
						bundle['app.css'] = { ...assetInfo, fileName: 'app.css' };
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
			input: { app: resolve(__dirname, 'src/index.jsx') },

			external: id => /^@wordpress\//.test(id),

			output: {
				entryFileNames: 'app.js',

				globals: {
					'@wordpress/api-fetch'   : 'wp.apiFetch',
					'@wordpress/element'     : 'wp.element',
					'@wordpress/i18n'        : 'wp.i18n',
					'@wordpress/hooks'       : 'wp.hooks',
					'@wordpress/block-editor': 'wp.blockEditor',
					'@wordpress/data'        : 'wp.data',
				},
			},
		},
	},
});