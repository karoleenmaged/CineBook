import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      "/tmdb-image": {
        target: "https://image.tmdb.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tmdb-image/, ""),
      },
    },
  },
})