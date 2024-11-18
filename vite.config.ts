import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/lib.ts",
      name: "intmax2-web-components",
      fileName: (format) => `index.${format}.js`,
      formats: ["es"]
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), 'react/jsx-runtime'],
    },
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
    tsconfigPaths()],
})
