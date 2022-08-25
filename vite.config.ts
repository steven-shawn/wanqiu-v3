import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { processExpression } from '@vue/compiler-core';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
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
    port: 3001,
    proxy: {
      "/pc": {
        target: "http://xqadminapi.tyltxt.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/auth": {
        target: "http://xqadminapi.tyltxt.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
})
