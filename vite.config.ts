import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  build: {
    outDir: 'dist/spa', // Matches your netlify.toml publish folder
    rollupOptions: {
      // Tells Vite to ignore the server module during frontend bundling
      external: ['./server', 'express'], 
    },
  },
}));
}
