import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins: [vue()],
  server:{
    port : 5500
  },
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
})
