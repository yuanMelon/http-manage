import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  server: {
    //http://music.163.com/song/media/outer/url?id=501220770.mp3
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/163': {
        target: 'http://music.163.com/song/media/outer/url',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/163/, '')
      },
      '/api': {
        target: 'http://localhost:3007',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
