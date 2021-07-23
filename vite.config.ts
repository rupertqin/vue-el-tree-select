import path from 'path'
import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2');
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  base: process.env.BASE || '/',
  build: {
    // lib: {
    //   entry: path.resolve(__dirname, 'public/index.html'),
    //   name: 'ElTreeSelect'
    // },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'element-ui'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        externalGlobals({
          vue: "Vue",
          'element-ui': "ELEMENT",
        })
      ]
    }
  }
})
