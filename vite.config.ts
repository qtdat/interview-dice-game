import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { analyzer } from 'vite-bundle-analyzer';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

import rollupConfigs from './rollup.config';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      env.VITE_ANALYZER === '1' ? analyzer() : null,
    ],
    server: {
      port: 3000,
    },
    build: {
      // sourcemap: true,
      chunkSizeWarningLimit: 1024,
      rollupOptions: rollupConfigs,
    },
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
  };
});
