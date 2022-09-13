import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "~": path.resolve(__dirname, './'),
      "@": path.resolve(__dirname, 'src'),
      "assets": path.resolve(__dirname, "src/assets"),
      "~assets": path.resolve(__dirname, "/src/assets"),
    },
  },
  // "process.env": process.env,
  plugins: [
    vue(),
    pugPlugin({ pretty: true }, { name: "template" }),
    styleImport({
      resolves: [VantResolve()],
    })
  ],
  server: {
    port: 3000,
    proxy: {
      "/pc": {
        target: "http://xqadminapi.tyltxt.com:88",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/auth": {
        target: "http://xqadminapi.tyltxt.com:88",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
})
