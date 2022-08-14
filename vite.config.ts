import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    pugPlugin({ pretty: true }, { name: "template" }),
    styleImport({
      resolves: [VantResolve()],
    })
  ],
  server: {
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
