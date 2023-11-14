import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    insertTypesEntry: true,
    rollupTypes: true
  })],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'broject_ui',
      // the proper extensions will be added
      fileName: 'broject_ui',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
  }
})
