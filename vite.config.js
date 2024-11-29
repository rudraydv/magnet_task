import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/magnet_task',
  // build: {
  //   outDir: 'dist', // Default folder for build output
  //   emptyOutDir: true, // Clears the output directory before building
  // },
  // server: {
  //   port: 3000, // Optional: Set a custom development server port
  //   open: true, // Optional: Automatically open the app in the browser during development
  // },
})
