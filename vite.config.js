import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

let prod = false; // set it to true when while taking prod build

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: prod ? '/VueLearnPath/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
