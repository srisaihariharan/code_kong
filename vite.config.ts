import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use a custom cache directory outside node_modules to reduce OneDrive locking issues
  cacheDir: '.vite-cache',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Polling helps in cloud-synced folders (OneDrive) where FS events can be flaky/locked
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  // Also apply for build to ensure consistent cache path
  build: {
    // nothing custom yet; placeholder in case we later tune rollup options
  },
});
