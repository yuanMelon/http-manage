import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    
  },
  server: {
    //http://music.163.com/song/media/outer/url?id=501220770.mp3
    port: 9999,
    host: '0.0.0.0',
    proxy:{
      '/163':{
        target:'http://music.163.com/song/media/outer/url',
        secure:false,
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/163/,'')

      }
    }
  }
})
