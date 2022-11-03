import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/css/variables.scss';`
      }
    },
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 14.965, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  }
})
