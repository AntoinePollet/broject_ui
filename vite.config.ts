import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    insertTypesEntry: true,
    rollupTypes: true,
    outDir: "dist"
  })],
  css: {
    preprocessorOptions: {
      
    }
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'broject_ui',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'umd']
    },
    cssCodeSplit: false,
    cssMinify: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'tabulator-tables'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'tabulator-tables': 'tabulator-tables'
        },
      },
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
  }
})
