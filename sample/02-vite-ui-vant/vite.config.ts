import { resolve } from 'path'
import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

const vuePlugin = createVuePlugin({ include: [/\.vue$/] })

export default defineConfig(async () => {
  return {
    root: __dirname,
    plugins: [
      vuePlugin,
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: name => `vant/es/${name}/style`
          }
        ]
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src')
        },
        {
          find: /~(.+)/,
          replacement: resolve(__dirname, 'node_modules/$1')
        }
      ]
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      }
    },
    server: {
      host: '127.0.0.1',
      port: 4100
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @import "./src/styles/theme.scss";
          `
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'vuex', 'vant']
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  }
})
