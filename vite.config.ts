/// <reference types="vitest" />
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      imports: ['vue', 'vitest'],
      dts: true,
    }),
    eslintPlugin({
      exclude: ['./node_modules/**'],
      cache: false,
    }),
    stylelintPlugin({
      fix: true,
      quiet: true,
    }),
    ViteEjsPlugin(config => ({
      CONFIG: config,
    })),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envDir: path.resolve(__dirname, './env'),
  envPrefix: ['VITE_'],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/index.scss";',
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: { includeSource: ['src/**/*.{js,ts}'] },
})
