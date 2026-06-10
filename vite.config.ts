import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Keep your existing imports as they are, but configure the build below

export default defineConfig({
  // ... Keep any existing config options you have here (like plugins or resolve) ...
  
  build: {
    outDir: 'dist/spa', // Your netlify.toml targets this publish folder
    rollupOptions: {
      external: ['./server', 'express'], // ✅ Tells Vite to ignore the server import during frontend bundling
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "index.html"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
