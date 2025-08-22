import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { peerDependencies } from "./package.json"

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [
    react(), 
    libInjectCss(),
    tailwindcss(), 
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/main.tsx', 'src/App.tsx', 'src/vite-env.d.ts', 'src/**/*.css'],
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      copyDtsFiles: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ReactChatWidget",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd", "iife"],
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
    copyPublicDir: false,
  },
})
