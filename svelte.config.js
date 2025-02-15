import adapter from '@sveltejs/adapter-vercel';

// /** @type {import('vite').Plugin} */
// const viteServerConfig = {
//     name: 'log-request-middleware',
//     configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//             res.setHeader("Access-Control-Allow-Origin", "*");
//             res.setHeader("Access-Control-Allow-Methods", "GET");
//             res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//             res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//             next();
//         });
//     }
// };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ edge: true })
	},

	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true
			}
		},
// 		viteServerConfig
	}
};

export default config;
